import { Request, Response } from "express";
import {
  generateStreamToken,
  verifyStreamToken,
} from "../services/stream.service";

export const getToken = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    const { movieId } = req.params;

    if (!movieId) {
      return res.status(400).json({
        status: "error",
        message: "movieId is required",
      });
    }

    const id = Array.isArray(movieId) ? movieId[0] : movieId;
    const result = await generateStreamToken(id, req.user.userId);

    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to generate stream token";
    const statusCode = (error as any).statusCode || 500;

    return res.status(statusCode).json({
      status: "error",
      message,
    });
  }
};

export const verify = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        status: "error",
        message: "token is required",
      });
    }

    const payload = verifyStreamToken(token);

    return res.status(200).json({
      status: "success",
      message: "Token is valid",
      data: payload,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid token";
    const statusCode = (error as any).statusCode || 401;

    return res.status(statusCode).json({
      status: "error",
      message,
    });
  }
};
