import Footer from "../../components/layout/Footer";
import MovieHeroSection from "../../components/hero/MovieHeroSection";
import MovieSection from "../../components/movies/MovieSection";
import { useCategories } from "../../hooks/Queries/useCategories";
import { useTrendingMovies } from "../../hooks/Queries/useTrendingMovies";
import { useMoviesByCategory } from "../../hooks/Queries/useMoviesByCategory";

const MoviePage = () => {
  //Fetching trending movies and categories
  const { data: trendingMovies, isLoading: trendingLoading } =
    useTrendingMovies(10);

  const { data: categories, isLoading: categoriesLoading } = useCategories();

  //Finding the id's of the categories we want to display
  const actionId = categories?.data.find(
    (c) => c.name === "Action" || c.name === "ACTION",
  )?.id;
  const sciFiId = categories?.data.find(
    (c) => c.name === "Sci-Fi" || c.name === "SCIENCE FICTION",
  )?.id;
  const dramaId = categories?.data.find(
    (c) => c.name === "Drama" || c.name === "DRAMA",
  )?.id;
  const comedyId = categories?.data.find(
    (c) => c.name === "Comedy" || c.name === "COMEDY",
  )?.id;

  //Fetching movies for each category
  const { data: actionMovies } = useMoviesByCategory(actionId!);
  const { data: sciFiMovies } = useMoviesByCategory(sciFiId!);
  const { data: dramaMovies } = useMoviesByCategory(dramaId!);
  const { data: comedyMovies } = useMoviesByCategory(comedyId!);

  if (trendingLoading || categoriesLoading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="bg-black text-white min-h-screen">
      <MovieHeroSection />

      {/*Trending Movies*/}

      <MovieSection title="Trending Now" movies={trendingMovies?.data ?? []} />

      {actionMovies?.data && actionMovies.data.length > 0 && (
        <MovieSection
          title="Popular Action Movies"
          movies={actionMovies.data}
        />
      )}

      {/* Sci-Fi Movies */}
      {sciFiMovies?.data && sciFiMovies.data.length > 0 && (
        <MovieSection title="Sci-Fi Adventures" movies={sciFiMovies.data} />
      )}

      {/* Drama Movies */}
      {dramaMovies?.data && dramaMovies.data.length > 0 && (
        <MovieSection title="Must-Watch Dramas" movies={dramaMovies.data} />
      )}

      {/* Comedy Movies */}
      {comedyMovies?.data && comedyMovies.data.length > 0 && (
        <MovieSection title="Comedy Favorites" movies={comedyMovies.data} />
      )}

      <Footer />
    </div>
  );
};

export default MoviePage;
