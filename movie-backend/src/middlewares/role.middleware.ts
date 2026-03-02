import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../db/database";
import { User } from "../entities/User";
import { AppError } from "./error.middleware";

export const requireRole = (requiredRole: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new AppError("Unauthorized", 401);
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { id: req.user.userId },
        relations: ["role"],
      });

      if (!user || !user.role) {
        throw new AppError("User or role not found", 404);
      }

      if (user.role.name !== requiredRole) {
        throw new AppError(`This action requires ${requiredRole} role`, 403);
      }

      next();
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          status: "error",
          message: error.message,
        });
      }
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  };
};
