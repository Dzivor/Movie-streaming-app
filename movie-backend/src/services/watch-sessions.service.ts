import { AppDataSource } from "../db/database";
import { WatchSession } from "../entities/Watchsession";
import { Movie } from "../entities/Movie";
import { User } from "../entities/User";

class WatchSessionError extends Error {
  statusCode = 400;
  constructor(message: string) {
    super(message);
  }
}

export const startWatchSession = async (userId: string, movieId: string) => {
  try {
    // Verify movie exists
    const movieRepository = AppDataSource.getRepository(Movie);
    const movie = await movieRepository.findOne({
      where: { id: movieId },
    });

    if (!movie) {
      throw new WatchSessionError("Movie not found");
    }

    // Check if user already has an active session for this movie
    const sessionRepository = AppDataSource.getRepository(WatchSession);
    const existingSession = await sessionRepository.findOne({
      where: { user: { id: userId }, movie: { id: movieId } },
    });

    if (existingSession) {
      // Update existing session
      existingSession.started_at = new Date();
      existingSession.last_position_seconds = 0;
      const updated = await sessionRepository.save(existingSession);
      return {
        id: updated.id,
        message: "Watch session updated",
      };
    }

    // Create new session
    const newSession = sessionRepository.create({
      user: { id: userId },
      movie: { id: movieId },
      started_at: new Date(),
      last_position_seconds: 0,
    });

    const saved = await sessionRepository.save(newSession);

    return {
      id: saved.id,
      message: "Watch session started",
    };
  } catch (error) {
    if (error instanceof WatchSessionError) {
      throw error;
    }
    throw new Error("Failed to start watch session");
  }
};

export const updateWatchPosition = async (
  userId: string,
  movieId: string,
  positionSeconds: number,
) => {
  try {
    const sessionRepository = AppDataSource.getRepository(WatchSession);

    const session = await sessionRepository.findOne({
      where: { user: { id: userId }, movie: { id: movieId } },
    });

    if (!session) {
      throw new WatchSessionError("Watch session not found");
    }

    session.last_position_seconds = positionSeconds;
    await sessionRepository.save(session);

    return {
      message: "Position updated",
      position: positionSeconds,
    };
  } catch (error) {
    if (error instanceof WatchSessionError) {
      throw error;
    }
    throw new Error("Failed to update watch position");
  }
};

export const getWatchSession = async (userId: string, movieId: string) => {
  try {
    const sessionRepository = AppDataSource.getRepository(WatchSession);

    const session = await sessionRepository.findOne({
      where: { user: { id: userId }, movie: { id: movieId } },
    });

    if (!session) {
      return null;
    }

    return {
      id: session.id,
      last_position_seconds: session.last_position_seconds,
      started_at: session.started_at,
    };
  } catch (error) {
    throw new Error("Failed to fetch watch session");
  }
};
