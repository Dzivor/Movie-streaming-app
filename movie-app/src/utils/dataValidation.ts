import type { Movie } from "../types/movie.types";

/**
 * Type guard to check if a value is a valid Movie object
 */
export const isValidMovie = (movie: unknown): movie is Movie => {
  if (!movie || typeof movie !== "object") {
    return false;
  }

  const movieObj = movie as Record<string, unknown>;

  return (
    typeof movieObj.id === "number" &&
    typeof movieObj.title === "string" &&
    typeof movieObj.description === "string" &&
    typeof movieObj.releaseYear === "number" &&
    typeof movieObj.durationMinutes === "number" &&
    typeof movieObj.thumbnail === "string" &&
    typeof movieObj.views === "number" &&
    Array.isArray(movieObj.categories) &&
    (movieObj.categories as unknown[]).every(
      (cat: unknown) => typeof cat === "string",
    )
  );
};

/**
 * Validating  array of movies and filtering invalid entries
 */
export const validateMovieArray = (data: unknown): Movie[] => {
  if (!Array.isArray(data)) {
    console.warn("Expected an array of movies, received:", typeof data);
    return [];
  }

  const validMovies = data.filter((item, index) => {
    const isValid = isValidMovie(item);
    if (!isValid) {
      console.warn(`Invalid movie object at index ${index}:`, item);
    }
    return isValid;
  });

  return validMovies;
};
