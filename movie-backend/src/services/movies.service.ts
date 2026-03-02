import { AppDataSource } from "../db/database";
import { Movie } from "../entities/Movie";
import { Category } from "../entities/Category";

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
