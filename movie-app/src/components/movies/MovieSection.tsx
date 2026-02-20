import type { Movie } from "../../types/movie.types";
import MovieCard from "./MovieCard";

interface MovieSectionProps {
  title: string;
  movies: Movie[];
}

const MovieSection: React.FC<MovieSectionProps> = ({ title, movies }) => {
  return (
    <section className="px-16 py-20">
      <h2 className="text-2xl font-semibold tracking-wider mb-8 uppercase">
        {title}
      </h2>

      <div className="grid grid-cols-2 grid-flow-row md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieSection;
