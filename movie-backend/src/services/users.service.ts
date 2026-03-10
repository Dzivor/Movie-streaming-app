import { AppDataSource } from "../db/database";
import { User } from "../entities/User";
import { Role } from "../entities/Role";
import { AdminLog } from "../entities/AdminLog";

class UserNotFoundError extends Error {
  statusCode = 404;
  constructor(message: string = "User not found") {
    super(message);
  }
}

class UserManagementError extends Error {
  statusCode = 400;
  constructor(message: string) {
    super(message);
  }
}

export const getAllUsers = async (page: number = 1, limit: number = 20) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const skip = (page - 1) * limit;

    const [users, total] = await userRepository.findAndCount({
      relations: ["role"],
      skip,
      take: limit,
      order: { created_at: "DESC" },
    });

    return {
      users: users.map((user) => ({
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role?.name || "user",
        created_at: user.created_at,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

export const getUserById = async (userId: string) => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ["role"],
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    return {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role?.name || "user",
      created_at: user.created_at,
    };
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      throw error;
    }
    throw new Error("Failed to fetch user");
  }
};

export const updateUserRole = async (
  userId: string,
  roleName: string,
  adminId?: string,
) => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const userRepository = queryRunner.manager.getRepository(User);
    const roleRepository = queryRunner.manager.getRepository(Role);

    // Find user
    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ["role"],
    });

    if (!user) {
      throw new UserNotFoundError();
    }

    // Validate role exists
    const role = await roleRepository.findOne({
      where: { name: roleName },
    });

    if (!role) {
      throw new UserManagementError("Role not found");
    }

    // Prevent removing last admin
    if (user.role?.name === "admin" && roleName !== "admin") {
      const adminCount = await userRepository.count({
        where: { role: { name: "admin" } },
      });

      if (adminCount <= 1) {
        throw new UserManagementError(
          "Cannot remove the last admin. At least one admin must exist.",
        );
      }
    }

    user.role = role;
    const updatedUser = await queryRunner.manager.save(user);

    // Log admin action
    if (adminId) {
      const adminLogRepository = queryRunner.manager.getRepository(AdminLog);
      const log = adminLogRepository.create({
        admin: { id: adminId },
        action: "update_role",
        entity_type: "user",
        entity_id: userId,
      });
      await queryRunner.manager.save(log);
    }

    await queryRunner.commitTransaction();

    return {
      message: "User role updated successfully",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        role: updatedUser.role?.name || "user",
      },
    };
  } catch (error) {
    await queryRunner.rollbackTransaction();
    if (
      error instanceof UserNotFoundError ||
      error instanceof UserManagementError
    ) {
      throw error;
    }
    throw new Error("Failed to update user role");
  } finally {
    await queryRunner.release();
  }
};

export { UserNotFoundError, UserManagementError };

export const deactivateUser = async (userId: string, adminId: string) => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const userRepository = queryRunner.manager.getRepository(User);

    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new UserNotFoundError();
    }

    user.is_active = false;
    await queryRunner.manager.save(user);

    // Log admin action
    const adminLogRepository = queryRunner.manager.getRepository(AdminLog);
    const log = adminLogRepository.create({
      admin: { id: adminId },
      action: "deactivate_user",
      entity_type: "user",
      entity_id: userId,
    });
    await queryRunner.manager.save(log);

    await queryRunner.commitTransaction();

    return {
      message: "User deactivated successfully",
    };
  } catch (error) {
    await queryRunner.rollbackTransaction();
    if (error instanceof UserNotFoundError) {
      throw error;
    }
    throw new Error("Failed to deactivate user");
  } finally {
    await queryRunner.release();
  }
};
