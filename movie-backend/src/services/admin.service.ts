import { AppDataSource } from "../db/database";
import { Movie } from "../entities/Movie";
import { MediaFile } from "../entities/MediaFile";
import { Category } from "../entities/Category";
import { AdminLog } from "../entities/AdminLog";
import { User } from "../entities/User";
import { Role } from "../entities/Role";

export interface UploadMovieInput {
  title: string;
  description?: string;
  category_id: string;
  duration_seconds: number;
  release_year: number;
  age_rating?: string;
  preview_time_limit?: number;
}

class UploadError extends Error {
  statusCode = 400;
  constructor(message: string) {
    super(message);
  }
}

export const uploadMovie = async (
  uploadData: UploadMovieInput,
  thumbnailPath: string,
  videoPath: string,
  uploadedByUserId: string,
) => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    // Validate category exists
    const categoryRepository = queryRunner.manager.getRepository(Category);
    const category = await categoryRepository.findOne({
      where: { id: uploadData.category_id },
    });

    if (!category) {
      throw new UploadError("Category not found");
    }

    // Create thumbnail media file
    const mediaFileRepository = queryRunner.manager.getRepository(MediaFile);
    const thumbnail = mediaFileRepository.create({
      url: thumbnailPath,
      type: "thumbnail",
    });
    const savedThumbnail = await queryRunner.manager.save(thumbnail);

    // Create video media file
    const video = mediaFileRepository.create({
      url: videoPath,
      type: "video",
    });
    const savedVideo = await queryRunner.manager.save(video);

    // Create movie
    const movieRepository = queryRunner.manager.getRepository(Movie);
    const movie = movieRepository.create({
      title: uploadData.title,
      description: uploadData.description,
      duration_seconds: uploadData.duration_seconds,
      release_year: uploadData.release_year,
      age_rating: uploadData.age_rating,
      preview_time_limit: uploadData.preview_time_limit,
      category: { id: uploadData.category_id },
      thumbnail_media: savedThumbnail,
      video_media: savedVideo,
      uploaded_by: { id: uploadedByUserId },
    });

    const savedMovie = await queryRunner.manager.save(movie);

    // Log admin action
    const adminLogRepository = queryRunner.manager.getRepository(AdminLog);
    const log = adminLogRepository.create({
      admin: { id: uploadedByUserId },
      action: "upload_movie",
      entity_type: "Movie",
      entity_id: savedMovie.id,
    });
    await queryRunner.manager.save(log);

    await queryRunner.commitTransaction();

    return {
      id: savedMovie.id,
      title: savedMovie.title,
      message: "Movie uploaded successfully",
    };
  } catch (error) {
    await queryRunner.rollbackTransaction();
    if (error instanceof UploadError) {
      throw error;
    }
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Upload movie error details:", error);
    throw new Error(`Failed to upload movie: ${errorMessage}`);
  } finally {
    await queryRunner.release();
  }
};

export const getAdminLogs = async (adminId?: string, limit: number = 50) => {
  try {
    const logRepository = AppDataSource.getRepository(AdminLog);

    let query = logRepository
      .createQueryBuilder("log")
      .leftJoinAndSelect("log.admin", "admin")
      .orderBy("log.created_at", "DESC")
      .take(limit);

    if (adminId) {
      query = query.where("log.adminId = :adminId", { adminId });
    }

    const logs = await query.getMany();

    return logs.map((log) => ({
      id: log.id,
      admin_name: `${log.admin?.first_name} ${log.admin?.last_name}`,
      action: log.action,
      entity_type: log.entity_type,
      entity_id: log.entity_id,
      created_at: log.created_at,
    }));
  } catch (error) {
    throw new Error("Failed to fetch admin logs");
  }
};

export const createCategory = async (
  name: string,
  description?: string,
  adminId?: string,
) => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const categoryRepository = queryRunner.manager.getRepository(Category);

    // Check if category with same name already exists
    const existingCategory = await categoryRepository.findOne({
      where: { name },
    });

    if (existingCategory) {
      throw new UploadError("Category with this name already exists");
    }

    // Create category
    const category = categoryRepository.create({
      name,
      description,
    });

    const savedCategory = await queryRunner.manager.save(category);

    // Log admin action if admin ID is provided
    if (adminId) {
      const adminLogRepository = queryRunner.manager.getRepository(AdminLog);
      const log = adminLogRepository.create({
        admin: { id: adminId },
        action: "create",
        entity_type: "category",
        entity_id: savedCategory.id,
      });
      await queryRunner.manager.save(log);
    }

    await queryRunner.commitTransaction();

    return {
      message: "Category created successfully",
      category: savedCategory,
    };
  } catch (error) {
    await queryRunner.rollbackTransaction();
    if (error instanceof UploadError) {
      throw error;
    }
    throw new Error("Failed to create category");
  } finally {
    await queryRunner.release();
  }
};

export const getAllCategories = async () => {
  try {
    const categoryRepository = AppDataSource.getRepository(Category);
    const categories = await categoryRepository.find({
      relations: ["movies"],
      order: { created_at: "DESC" },
    });

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      movieCount: category.movies?.length || 0,
      created_at: category.created_at,
    }));
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const categoryRepository = AppDataSource.getRepository(Category);
    const category = await categoryRepository.findOne({
      where: { id },
      relations: ["movies"],
    });

    if (!category) {
      throw new UploadError("Category not found");
    }

    return {
      id: category.id,
      name: category.name,
      description: category.description,
      movieCount: category.movies?.length || 0,
      created_at: category.created_at,
    };
  } catch (error) {
    if (error instanceof UploadError) {
      throw error;
    }
    throw new Error("Failed to fetch category");
  }
};

export const updateCategory = async (
  id: string,
  name: string,
  description?: string,
  adminId?: string,
) => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const categoryRepository = queryRunner.manager.getRepository(Category);

    const category = await categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new UploadError("Category not found");
    }

    // Check if new name conflicts with existing category
    if (name !== category.name) {
      const existingCategory = await categoryRepository.findOne({
        where: { name },
      });

      if (existingCategory) {
        throw new UploadError("Category with this name already exists");
      }
    }

    category.name = name;
    category.description = description;

    const updatedCategory = await queryRunner.manager.save(category);

    // Log admin action
    if (adminId) {
      const adminLogRepository = queryRunner.manager.getRepository(AdminLog);
      const log = adminLogRepository.create({
        admin: { id: adminId },
        action: "update",
        entity_type: "category",
        entity_id: updatedCategory.id,
      });
      await queryRunner.manager.save(log);
    }

    await queryRunner.commitTransaction();

    return {
      message: "Category updated successfully",
      category: updatedCategory,
    };
  } catch (error) {
    await queryRunner.rollbackTransaction();
    if (error instanceof UploadError) {
      throw error;
    }
    throw new Error("Failed to update category");
  } finally {
    await queryRunner.release();
  }
};

export const deleteCategory = async (id: string, adminId?: string) => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const categoryRepository = queryRunner.manager.getRepository(Category);

    const category = await categoryRepository.findOne({
      where: { id },
      relations: ["movies"],
    });

    if (!category) {
      throw new UploadError("Category not found");
    }

    if (category.movies && category.movies.length > 0) {
      throw new UploadError(
        "Cannot delete category with associated movies. Please reassign or delete movies first.",
      );
    }

    await queryRunner.manager.remove(category);

    // Log admin action
    if (adminId) {
      const adminLogRepository = queryRunner.manager.getRepository(AdminLog);
      const log = adminLogRepository.create({
        admin: { id: adminId },
        action: "delete",
        entity_type: "category",
        entity_id: id,
      });
      await queryRunner.manager.save(log);
    }

    await queryRunner.commitTransaction();

    return {
      message: "Category deleted successfully",
    };
  } catch (error) {
    await queryRunner.rollbackTransaction();
    if (error instanceof UploadError) {
      throw error;
    }
    throw new Error("Failed to delete category");
  } finally {
    await queryRunner.release();
  }
};
