import { Request, Response } from "express";
import { randomUUID } from "crypto";
import {
  uploadMovie,
  getAdminLogs,
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getAdminStats,
} from "../services/admin.service";
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

    // Generate a single UUID for organizing both files together
    const movieIdSeed = randomUUID();

    // Upload thumbnail to R2
    const thumbnailResult = await uploadToR2(
      thumbnailFile,
      "thumbnail",
      movieIdSeed,
    );
    uploadedThumbnailKey = thumbnailResult.key;

    // Upload video to R2
    const videoResult = await uploadToR2(videoFile, "video", movieIdSeed);
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

    console.error("Upload endpoint error:", error);
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

export const addCategory = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    const { name, description } = req.body;

    const result = await createCategory(name, description, req.user.userId);

    return res.status(201).json({
      status: "success",
      message: result.message,
      data: result.category,
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("already exists")) {
      return res.status(409).json({
        status: "error",
        message: error.message,
      });
    }

    return res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to create category",
    });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategories();

    return res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to fetch categories",
    });
  }
};

export const getCategory = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const category = await getCategoryById(id);

    return res.status(200).json({
      status: "success",
      data: category,
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
        error instanceof Error ? error.message : "Failed to fetch category",
    });
  }
};

export const editCategory = async (
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
    const { name, description } = req.body;

    const result = await updateCategory(id, name, description, req.user.userId);

    return res.status(200).json({
      status: "success",
      message: result.message,
      data: result.category,
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      return res.status(404).json({
        status: "error",
        message: error.message,
      });
    }

    if (error instanceof Error && error.message.includes("already exists")) {
      return res.status(409).json({
        status: "error",
        message: error.message,
      });
    }

    return res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to update category",
    });
  }
};

export const removeCategory = async (
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

    const result = await deleteCategory(id, req.user.userId);

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

    if (
      error instanceof Error &&
      error.message.includes("Cannot delete category")
    ) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }

    return res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to delete category",
    });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    const stats = await getAdminStats();

    return res.status(200).json({
      status: "success",
      data: stats,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to fetch statistics",
    });
  }
};
