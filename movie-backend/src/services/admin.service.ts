import { AppDataSource } from "../db/database";
import { Movie } from "../entities/Movie";
import { MediaFile } from "../entities/MediaFile";
import { Category } from "../entities/Category";
import { AdminLog } from "../entities/AdminLog";

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
    throw new Error("Failed to upload movie");
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
