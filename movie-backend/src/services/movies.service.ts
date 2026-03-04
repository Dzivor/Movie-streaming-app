import { AppDataSource } from "../db/database";
import { Movie } from "../entities/Movie";
import { Category } from "../entities/Category";
import { MediaFile } from "../entities/MediaFile";
import { AdminLog } from "../entities/AdminLog";
import { ILike } from "typeorm";

export class MovieNotFoundError extends Error {
  statusCode = 404;
  constructor(message: string = "Movie not found") {
    super(message);
  }
}

export const getTrendingMovies = async (limit: number = 10) => {
  try {
    const movieRepository = AppDataSource.getRepository(Movie);

    const movies = await movieRepository.find({
      relations: ["category", "thumbnail_media"],
      take: limit,
      order: { created_at: "DESC" },
    });

    return movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      thumbnail_url: movie.thumbnail_media?.url,
      duration: movie.duration_seconds,
      category: movie.category?.name,
    }));
  } catch (error) {
    throw new Error("Failed to fetch trending movies");
  }
};

export const getHeroMovies = async () => {
  try {
    const movieRepository = AppDataSource.getRepository(Movie);

    // Get hero movies (you can add a hero flag to Movie entity later)
    const movies = await movieRepository.find({
      relations: ["category", "thumbnail_media"],
      take: 5,
      order: { created_at: "DESC" },
    });

    return movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      description: movie.description,
      thumbnail_url: movie.thumbnail_media?.url,
      duration: movie.duration_seconds,
      age_rating: movie.age_rating,
    }));
  } catch (error) {
    throw new Error("Failed to fetch hero movies");
  }
};

export const getMovieById = async (movieId: string) => {
  try {
    const movieRepository = AppDataSource.getRepository(Movie);

    const movie = await movieRepository.findOne({
      where: { id: movieId },
      relations: ["category", "thumbnail_media", "video_media", "uploaded_by"],
    });

    if (!movie) {
      throw new MovieNotFoundError();
    }

    return {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      duration: movie.duration_seconds,
      release_year: movie.release_year,
      age_rating: movie.age_rating,
      preview_time_limit: movie.preview_time_limit,
      category: movie.category?.name,
      thumbnail_url: movie.thumbnail_media?.url,
      video_url: movie.video_media?.url,
      uploaded_by: {
        id: movie.uploaded_by?.id,
        name: `${movie.uploaded_by?.first_name} ${movie.uploaded_by?.last_name}`,
      },
    };
  } catch (error) {
    if (error instanceof MovieNotFoundError) {
      throw error;
    }
    throw new Error("Failed to fetch movie details");
  }
};

export const getAllMovies = async (
  page: number = 1,
  limit: number = 20,
  categoryId?: string,
) => {
  try {
    const movieRepository = AppDataSource.getRepository(Movie);
    const skip = (page - 1) * limit;

    const whereClause: any = {};
    if (categoryId) {
      whereClause.category = { id: categoryId };
    }

    const [movies, total] = await movieRepository.findAndCount({
      where: whereClause,
      relations: ["category", "thumbnail_media"],
      take: limit,
      skip,
      order: { created_at: "DESC" },
    });

    return {
      movies: movies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        description: movie.description,
        thumbnail_url: movie.thumbnail_media?.url,
        duration: movie.duration_seconds,
        release_year: movie.release_year,
        age_rating: movie.age_rating,
        category: movie.category?.name,
        category_id: movie.category?.id,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    throw new Error("Failed to fetch movies");
  }
};

export const searchMovies = async (query: string, limit: number = 20) => {
  try {
    const movieRepository = AppDataSource.getRepository(Movie);

    const movies = await movieRepository.find({
      where: [
        { title: ILike(`%${query}%`) },
        { description: ILike(`%${query}%`) },
      ],
      relations: ["category", "thumbnail_media"],
      take: limit,
      order: { created_at: "DESC" },
    });

    return movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      description: movie.description,
      thumbnail_url: movie.thumbnail_media?.url,
      duration: movie.duration_seconds,
      release_year: movie.release_year,
      category: movie.category?.name,
    }));
  } catch (error) {
    throw new Error("Failed to search movies");
  }
};

export const getMoviesByCategory = async (
  categoryId: string,
  page: number = 1,
  limit: number = 20,
) => {
  try {
    const movieRepository = AppDataSource.getRepository(Movie);
    const skip = (page - 1) * limit;

    const [movies, total] = await movieRepository.findAndCount({
      where: { category: { id: categoryId } },
      relations: ["category", "thumbnail_media"],
      take: limit,
      skip,
      order: { created_at: "DESC" },
    });

    return {
      movies: movies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        description: movie.description,
        thumbnail_url: movie.thumbnail_media?.url,
        duration: movie.duration_seconds,
        release_year: movie.release_year,
        age_rating: movie.age_rating,
        category: movie.category?.name,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    throw new Error("Failed to fetch movies by category");
  }
};

export const updateMovie = async (
  movieId: string,
  updateData: {
    title?: string;
    description?: string;
    category_id?: string;
    duration_seconds?: number;
    release_year?: number;
    age_rating?: string;
    preview_time_limit?: number;
  },
  adminId?: string,
) => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const movieRepository = queryRunner.manager.getRepository(Movie);

    const movie = await movieRepository.findOne({
      where: { id: movieId },
      relations: ["category"],
    });

    if (!movie) {
      throw new MovieNotFoundError();
    }

    // Validate category if provided
    if (updateData.category_id) {
      const categoryRepository = queryRunner.manager.getRepository(Category);
      const category = await categoryRepository.findOne({
        where: { id: updateData.category_id },
      });

      if (!category) {
        const error = new Error("Category not found");
        (error as any).statusCode = 400;
        throw error;
      }

      movie.category = category;
    }

    // Update fields
    if (updateData.title) movie.title = updateData.title;
    if (updateData.description !== undefined)
      movie.description = updateData.description;
    if (updateData.duration_seconds)
      movie.duration_seconds = updateData.duration_seconds;
    if (updateData.release_year) movie.release_year = updateData.release_year;
    if (updateData.age_rating !== undefined)
      movie.age_rating = updateData.age_rating;
    if (updateData.preview_time_limit !== undefined)
      movie.preview_time_limit = updateData.preview_time_limit;

    const updatedMovie = await queryRunner.manager.save(movie);

    // Log admin action
    if (adminId) {
      const adminLogRepository = queryRunner.manager.getRepository(AdminLog);
      const log = adminLogRepository.create({
        admin: { id: adminId },
        action: "update",
        entity_type: "movie",
        entity_id: updatedMovie.id,
      });
      await queryRunner.manager.save(log);
    }

    await queryRunner.commitTransaction();

    return {
      message: "Movie updated successfully",
      movie: updatedMovie,
    };
  } catch (error) {
    await queryRunner.rollbackTransaction();
    if (error instanceof MovieNotFoundError) {
      throw error;
    }
    if ((error as any).statusCode) {
      throw error;
    }
    throw new Error("Failed to update movie");
  } finally {
    await queryRunner.release();
  }
};

export const deleteMovie = async (movieId: string, adminId?: string) => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const movieRepository = queryRunner.manager.getRepository(Movie);

    const movie = await movieRepository.findOne({
      where: { id: movieId },
      relations: ["thumbnail_media", "video_media"],
    });

    if (!movie) {
      throw new MovieNotFoundError();
    }

    // Store media file references for cleanup
    const thumbnailKey = movie.thumbnail_media?.url;
    const videoKey = movie.video_media?.url;

    // Delete media files from database
    if (movie.thumbnail_media) {
      await queryRunner.manager.remove(movie.thumbnail_media);
    }
    if (movie.video_media) {
      await queryRunner.manager.remove(movie.video_media);
    }

    // Delete movie
    await queryRunner.manager.remove(movie);

    // Log admin action
    if (adminId) {
      const adminLogRepository = queryRunner.manager.getRepository(AdminLog);
      const log = adminLogRepository.create({
        admin: { id: adminId },
        action: "delete",
        entity_type: "movie",
        entity_id: movieId,
      });
      await queryRunner.manager.save(log);
    }

    await queryRunner.commitTransaction();

    return {
      message: "Movie deleted successfully",
      mediaKeys: { thumbnailKey, videoKey },
    };
  } catch (error) {
    await queryRunner.rollbackTransaction();
    if (error instanceof MovieNotFoundError) {
      throw error;
    }
    throw new Error("Failed to delete movie");
  } finally {
    await queryRunner.release();
  }
};
