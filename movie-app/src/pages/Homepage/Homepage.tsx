import { useTrendingMovies } from "../../hooks/Queries/useTrendingMovies";
import { useMovies } from "../../hooks/Queries/useMovies";
import Footer from "../../components/layout/Footer";
import HeroSection from "../../components/hero/HeroSection";
import MovieSection from "../../components/movies/MovieSection";

const HomePage = () => {
  const { data: trendingData, isLoading: trendingLoading } =
    useTrendingMovies(10);
  const { data: moviesData, isLoading: moviesLoading } = useMovies({
    limit: 10,
  });

  return (
    <main className="bg-black text-white min-h-screen">
      <HeroSection />
      {trendingLoading ? (
        <p>Loading...</p>
      ) : (
        <MovieSection title="Trending Now" movies={trendingData?.data ?? []} />
      )}
      {moviesLoading ? (
        <p>Loading...</p>
      ) : (
        <MovieSection title="New Release" movies={moviesData?.data ?? []} />
      )}
      <Footer />
    </main>
  );
};

export default HomePage;
