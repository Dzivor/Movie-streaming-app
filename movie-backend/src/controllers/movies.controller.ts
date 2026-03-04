import { Request, Response } from "express";
import {
  getTrendingMovies,
  getHeroMovies,
  getMovieById,
  getAllMovies,
  searchMovies,
  getMoviesByCategory,
  updateMovie,
  deleteMovie,
  MovieNotFoundError,
} from "../services/movies.service";
import { deleteFromR2 } from "../services/r2.service";

export const trending = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const movies = await getTrendingMovies(limit);

    return res.status(200).json({
      status: "success",
      data: movies,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch trending movies",
    });
  }
};

export const hero = async (req: Request, res: Response) => {
  try {
    const movies = await getHeroMovies();

    return res.status(200).json({
      status: "success",
      data: movies,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch hero movies",
    });
  }
};

export const getDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movieId = Array.isArray(id) ? id[0] : id;
    const movie = await getMovieById(movieId);

    return res.status(200).json({
      status: "success",
      data: movie,
    });
  } catch (error) {
    if (error instanceof MovieNotFoundError) {
      return res.status(404).json({
        status: "error",
        message: error.message,
      });
    }
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch movie details",
    });
  }
};

export const getMovies = async (req: Request, res: Response) => {
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
    const categoryId = req.query.category as string | undefined;

    const result = await getAllMovies(page, limit, categoryId);

    return res.status(200).json({
      status: "success",
      data: result.movies,
      pagination: result.pagination,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to fetch movies",
    });
  }
};

export const search = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;

    if (!query) {
      return res.status(400).json({
        status: "error",
        message: "Search query is required",
      });
    }

    const movies = await searchMovies(query, limit);

    return res.status(200).json({
      status: "success",
      data: movies,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to search movies",
    });
  }
};

export const getByCategory = async (
  req: Request<{ categoryId: string }>,
  res: Response,
) => {
  try {
    const { categoryId } = req.params;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;

    const result = await getMoviesByCategory(categoryId, page, limit);

    return res.status(200).json({
      status: "success",
      data: result.movies,
      pagination: result.pagination,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch movies by category",
    });
  }
};

export const editMovie = async (
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
    const updateData = req.body;

    const result = await updateMovie(id, updateData, req.user.userId);

    return res.status(200).json({
      status: "success",
      message: result.message,
      data: result.movie,
    });
  } catch (error) {
    if (error instanceof MovieNotFoundError) {
      return res.status(404).json({
        status: "error",
        message: error.message,
      });
    }

    if ((error as any).statusCode === 400) {
      return res.status(400).json({
        status: "error",
        message: (error as Error).message,
      });
    }

    return res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to update movie",
    });
  }
};

export const removeMovie = async (
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

    const result = await deleteMovie(id, req.user.userId);

    // Attempt to delete files from R2 storage (best effort)
    if (result.mediaKeys.thumbnailKey) {
      await deleteFromR2(result.mediaKeys.thumbnailKey).catch((err) =>
        console.error("Failed to delete thumbnail from R2:", err),
      );
    }
    if (result.mediaKeys.videoKey) {
      await deleteFromR2(result.mediaKeys.videoKey).catch((err) =>
        console.error("Failed to delete video from R2:", err),
      );
    }

    return res.status(200).json({
      status: "success",
      message: result.message,
    });
  } catch (error) {
    if (error instanceof MovieNotFoundError) {
      return res.status(404).json({
        status: "error",
        message: error.message,
      });
    }

    return res.status(500).json({
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to delete movie",
    });
  }
};
