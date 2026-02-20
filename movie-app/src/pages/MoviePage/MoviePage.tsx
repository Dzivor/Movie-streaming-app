import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import MovieHeroSection from "../../components/hero/MovieHeroSection";
import MovieSection from "../../components/movies/MovieSection";
import {
  trendingMovies,
  actionMovies,
  sciFiMovies,
  dramaMovies,
  comedyMovies,
  newReleases,
} from "../../Data/movie";
import { validateMovieArray } from "../../utils/dataValidation";
import { useMemo } from "react";

const MoviePage = () => {
  // Validate all movie data using guards
  const validatedTrendingMovies = useMemo(
    () => validateMovieArray(trendingMovies),
    [],
  );
  const validatedActionMovies = useMemo(
    () => validateMovieArray(actionMovies),
    [],
  );
  const validatedSciFiMovies = useMemo(
    () => validateMovieArray(sciFiMovies),
    [],
  );
  const validatedDramaMovies = useMemo(
    () => validateMovieArray(dramaMovies),
    [],
  );
  const validatedComedyMovies = useMemo(
    () => validateMovieArray(comedyMovies),
    [],
  );
  const validatedNewReleases = useMemo(
    () => validateMovieArray(newReleases),
    [],
  );

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <MovieHeroSection />

      {/*Trending Movies*/}
      {validatedTrendingMovies.length > 0 && (
        <MovieSection title="Trending Now" movies={validatedTrendingMovies} />
      )}

      {/* New Releases */}
      {validatedNewReleases.length > 0 && (
        <MovieSection title="New Releases" movies={validatedNewReleases} />
      )}

      {/* Action Movies */}
      {validatedActionMovies.length > 0 && (
        <MovieSection
          title="Popular Action Movies"
          movies={validatedActionMovies}
        />
      )}

      {/* Sci-Fi Movies */}
      {validatedSciFiMovies.length > 0 && (
        <MovieSection title="Sci-Fi Adventures" movies={validatedSciFiMovies} />
      )}

      {/* Drama Movies */}
      {validatedDramaMovies.length > 0 && (
        <MovieSection title="Must-Watch Dramas" movies={validatedDramaMovies} />
      )}

      {/* Comedy Movies */}
      {validatedComedyMovies.length > 0 && (
        <MovieSection title="Comedy Favorites" movies={validatedComedyMovies} />
      )}

      <Footer />
    </div>
  );
};

export default MoviePage;
