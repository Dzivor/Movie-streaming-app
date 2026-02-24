import Footer from "../../components/layout/Footer";
import HeroSection from "../../components/hero/HeroSection";
import MovieSection from "../../components/movies/MovieSection";
import { trendingMovies } from "../../Data/movie";

const HomePage = () => {
  const movie = (data: unknown) => {
    data = data as unknown[];
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }
    return data;
  };
  const movies = movie(trendingMovies);
  console.log(movies);
  return (
    <main className="bg-black text-white min-h-screen">
      <HeroSection />
      <MovieSection title="Trending Now" movies={movies} />
      <MovieSection title="New Release" movies={movies} />
      <Footer />
    </main>
  );
};

export default HomePage;
