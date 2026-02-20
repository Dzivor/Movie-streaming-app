import Navbar from "../../components/layout/Navbar";
import HeroSection from "../../components/hero/HeroSection";
import MovieSection from "../../components/movies/MovieSection";
import { trendingMovies } from "../../Data/movie";

const HomePage = () => {
  const movie = (data) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }
    return data;
  };
  const movies = movie(trendingMovies);
  console.log(movies);
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <HeroSection />
      <MovieSection title="Trending Now" movies={movies} />
      <MovieSection title="New Release" movies={movies} />
    </main>
  );
};

export default HomePage;
