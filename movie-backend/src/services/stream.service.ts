import { AppDataSource } from "../db/database";
import { Movie } from "../entities/Movie";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.config";

class StreamError extends Error {
  statusCode = 400;
  constructor(message: string) {
    super(message);
  }
}

export interface StreamTokenPayload {
  movieId: string;
  userId: string;
  type: "stream";
}

export const generateStreamToken = async (movieId: string, userId: string) => {
  try {
    // Verify movie exists
    const movieRepository = AppDataSource.getRepository(Movie);
    const movie = await movieRepository.findOne({
      where: { id: movieId },
      relations: ["video_media"],
    });

    if (!movie) {
      throw new StreamError("Movie not found");
    }

    if (!movie.video_media || !movie.video_media.url) {
      throw new StreamError("Video not available for streaming");
    }

    // Generate JWT token with stream permissions
    const payload: StreamTokenPayload = {
      movieId,
      userId,
      type: "stream",
    };

    const token = jwt.sign(payload, jwtConfig.accessTokenSecret, {
      expiresIn: "1h", // Stream token valid for 1 hour
    });

    return {
      token,
      video_url: movie.video_media.url,
      expires_in: 3600, // 1 hour in seconds
    };
  } catch (error) {
    if (error instanceof StreamError) {
      throw error;
    }
    throw new Error("Failed to generate stream token");
  }
};

export const verifyStreamToken = (token: string) => {
  try {
    const payload = jwt.verify(
      token,
      jwtConfig.accessTokenSecret,
    ) as StreamTokenPayload;

    if (payload.type !== "stream") {
      throw new StreamError("Invalid token type");
    }

    return payload;
  } catch (error) {
    throw new StreamError("Invalid or expired stream token");
  }
};
