import { Request, Response } from "express";
import {
  startWatchSession,
  updateWatchPosition,
  getWatchSession,
} from "../services/watch-sessions.service";

export const start = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    const { movie_id } = req.body;

    if (!movie_id) {
      return res.status(400).json({
        status: "error",
        message: "movie_id is required",
      });
    }

    const result = await startWatchSession(req.user.userId, movie_id);

    return res.status(201).json({
      status: "success",
      message: result.message,
      data: result,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to start watch session";
    const statusCode = (error as any).statusCode || 500;

    return res.status(statusCode).json({
      status: "error",
      message,
    });
  }
};

export const updatePosition = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    const { movie_id, position_seconds } = req.body;

    if (!movie_id || position_seconds === undefined) {
      return res.status(400).json({
        status: "error",
        message: "movie_id and position_seconds are required",
      });
    }

    const result = await updateWatchPosition(
      req.user.userId,
      movie_id,
      position_seconds,
    );

    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to update watch position";
    const statusCode = (error as any).statusCode || 500;

    return res.status(statusCode).json({
      status: "error",
      message,
    });
  }
};

export const getPosition = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    const { movie_id } = req.params;

    if (!movie_id) {
      return res.status(400).json({
        status: "error",
        message: "movie_id is required",
      });
    }

    const id = Array.isArray(movie_id) ? movie_id[0] : movie_id;
    const session = await getWatchSession(req.user.userId, id);

    if (!session) {
      return res.status(404).json({
        status: "error",
        message: "Watch session not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: session,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch watch session",
    });
  }
};
