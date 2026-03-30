import type { MovieDetail } from "../../backend/apiClient";
import { useNavigate } from "react-router-dom";
import { useAuthModal } from "../../hooks/useAuthModal";
import { useAuth } from "../../hooks/Queries/useAuth";

interface MovieCardProps {
  movie: MovieDetail;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();
  const { data } = useAuth();
  const { openLoginModal } = useAuthModal();
  const isAuthenticated = !!data?.user;

  const handleCardClick = () => {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative cursor-pointer bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:scale-105 transition-transform duration-300"
    >
      <img
        src={movie.thumbnail_url}
        alt={movie.title}
        className="w-full h-72  object-cover object-center"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{movie.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2">
          {movie.description}
        </p>

        <div className="flex justify-between mt-3 text-xs text-gray-400">
          <span>{Math.floor((movie.duration_seconds ?? 0) / 60)} min</span>
          <span>{movie.release_year} release year</span>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-40 "></div>
    </div>
  );
};

export default MovieCard;
