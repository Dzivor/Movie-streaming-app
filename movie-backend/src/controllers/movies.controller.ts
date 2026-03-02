import { Request, Response } from "express";
import {
  getTrendingMovies,
  getHeroMovies,
  getMovieById,
  MovieNotFoundError,
} from "../services/movies.service";

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
