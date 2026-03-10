import { Request, Response } from "express";
import { AppDataSource } from "../db/database";
import { User } from "../entities/User";
import {
  loginUser,
  registerUser,
  refreshAccessToken,
  toAuthError,
  toPublicUser,
} from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { user, tokens } = await registerUser(req.body);

    return res.status(201).json({
      message: "Registration successful",
      user: toPublicUser(user),
      tokens,
    });
  } catch (error) {
    const authError = toAuthError(error);

    return res.status(authError.statusCode).json({
      message: authError.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { user, tokens } = await loginUser(req.body);

    return res.status(200).json({
      message: "Login successful",
      user: toPublicUser(user),
      tokens,
    });
  } catch (error) {
    const authError = toAuthError(error);

    return res.status(authError.statusCode).json({
      message: authError.message,
    });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await refreshAccessToken(refreshToken);

    return res.status(200).json({
      message: "Token refreshed successfully",
      tokens,
    });
  } catch (error) {
    const authError = toAuthError(error);

    return res.status(authError.statusCode).json({
      message: authError.message,
    });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: req.user.userId },
      relations: ["role"],
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user: toPublicUser(user),
    });
  } catch (error) {
    const authError = toAuthError(error);

    return res.status(authError.statusCode).json({
      message: authError.message,
    });
  }
};
