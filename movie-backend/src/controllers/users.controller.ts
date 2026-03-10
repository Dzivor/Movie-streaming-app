import { Request, Response } from "express";
import {
  getAllUsers,
  getUserById,
  updateUserRole,
  deactivateUser,
} from "../services/users.service";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;

    const result = await getAllUsers(page, limit);

    return res.status(200).json({
      status: "success",
      data: result.users,
      pagination: result.pagination,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to fetch users",
    });
  }
};

export const getUser = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      return res.status(404).json({
        status: "error",
        message: error.message,
      });
    }

    return res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Failed to fetch user",
    });
  }
};

export const updateUserRoleHandler = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    const { id } = req.params;
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({
        status: "error",
        message: "Role is required",
      });
    }

    const result = await updateUserRole(id, role, req.user.userId);

    return res.status(200).json({
      status: "success",
      message: result.message,
      data: result.user,
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      return res.status(404).json({
        status: "error",
        message: error.message,
      });
    }

    return res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to update user role",
    });
  }
};

export const deactivateUserHandler = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    const { id } = req.params;

    const result = await deactivateUser(id, req.user.userId);

    return res.status(200).json({
      status: "success",
      message: result.message,
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      return res.status(404).json({
        status: "error",
        message: error.message,
      });
    }

    return res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to deactivate user",
    });
  }
};
