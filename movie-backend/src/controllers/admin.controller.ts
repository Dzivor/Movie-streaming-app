import { Request, Response } from "express";
import { uploadMovie, getAdminLogs } from "../services/admin.service";
import { uploadToR2, deleteFromR2 } from "../services/r2.service";

export const upload = async (req: Request, res: Response) => {
  let uploadedThumbnailKey: string | null = null;
  let uploadedVideoKey: string | null = null;

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

    const thumbnailFile = Array.isArray(thumbnailFiles)
      ? thumbnailFiles[0]
      : thumbnailFiles;
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

    // Upload thumbnail to R2
    const thumbnailResult = await uploadToR2(thumbnailFile, "thumbnail");
    uploadedThumbnailKey = thumbnailResult.key;

    // Upload video to R2
    const videoResult = await uploadToR2(videoFile, "video");
    uploadedVideoKey = videoResult.key;

    const uploadData = {
      title,
      description,
      category_id,
      duration_seconds: parseInt(duration_seconds, 10),
      release_year: parseInt(release_year, 10),
      age_rating,
      preview_time_limit: preview_time_limit
        ? parseInt(preview_time_limit, 10)
        : undefined,
    };

    // Save movie metadata to database with R2 keys
    const result = await uploadMovie(
      uploadData,
      thumbnailResult.key,
      videoResult.key,
      req.user.userId,
    );

    return res.status(201).json({
      status: "success",
      message: result.message,
      data: result,
    });
  } catch (error) {
    // Cleanup: Delete uploaded files from R2 if database operation fails
    if (uploadedThumbnailKey) {
      await deleteFromR2(uploadedThumbnailKey).catch((err) =>
        console.error("Failed to cleanup thumbnail:", err),
      );
    }
    if (uploadedVideoKey) {
      await deleteFromR2(uploadedVideoKey).catch((err) =>
        console.error("Failed to cleanup video:", err),
      );
    }

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
