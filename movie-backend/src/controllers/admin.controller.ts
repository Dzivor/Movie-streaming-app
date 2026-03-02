import { Request, Response } from "express";
import { uploadMovie, getAdminLogs } from "../services/admin.service";

export const upload = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    if (!req.files || !("thumbnail" in req.files) || !("video" in req.files)) {
      return res.status(400).json({
        status: "error",
        message: "Both thumbnail and video files are required",
      });
    }

    const thumbnailFiles = req.files.thumbnail;
    const videoFiles = req.files.video;

    const thumbnailFile = Array.isArray(thumbnailFiles) ? thumbnailFiles[0] : thumbnailFiles;
    const videoFile = Array.isArray(videoFiles) ? videoFiles[0] : videoFiles;

    if (!thumbnailFile || !videoFile) {
      return res.status(400).json({
        status: "error",
        message: "Both thumbnail and video files are required",
      });
    }

    const {
      title,
      description,
      category_id,
      duration_seconds,
      release_year,
      age_rating,
      preview_time_limit,
    } = req.body;

    // Validate required fields
    if (!title || !category_id || !duration_seconds || !release_year) {
      return res.status(400).json({
        status: "error",
        message:
          "Missing required fields: title, category_id, duration_seconds, release_year",
      });
    }

    const uploadData = {
      title,
      description,
      category_id,
      duration_seconds: parseInt(duration_seconds),
      release_year: parseInt(release_year),
      age_rating,
      preview_time_limit: preview_time_limit
        ? parseInt(preview_time_limit)
        : undefined,
    };

    const result = await uploadMovie(
      uploadData,
      thumbnailFile.path,
      videoFile.path,
      req.user.userId,
    );

    return res.status(201).json({
      status: "success",
      message: result.message,
      data: result,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to upload movie";
    const statusCode = (error as any).statusCode || 500;

    return res.status(statusCode).json({
      status: "error",
      message,
    });
  }
};

export const getLogs = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    const { admin_id, limit } = req.query;
    const logs = await getAdminLogs(
      admin_id as string,
      limit ? parseInt(limit as string) : 50,
    );

    return res.status(200).json({
      status: "success",
      data: logs,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch admin logs",
    });
  }
};
