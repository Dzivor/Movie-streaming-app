import { useParams, useNavigate } from "react-router-dom";
import { Play, Clock, Calendar } from "lucide-react";
import { useEffect } from "react";
import Footer from "../../components/layout/Footer";
import { useMovie } from "../../hooks/Queries/useMovie";
import { useAuth } from "../../hooks/Queries/useAuth";
import { useAuthModal } from "../../hooks/useAuthModal";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data: movieData, isLoading } = useMovie(id);
  const { data: authData, isLoading: isAuthLoading } = useAuth();
  const movie = movieData?.data;
  const isAuthenticated = !!authData?.user;
  const { openLoginModal } = useAuthModal();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      navigate("/");
      openLoginModal();
    }
  }, [isAuthenticated, isAuthLoading]);

  

  if (isLoading || isAuthLoading)
    return <p className="text-white text-center mt-20">Loading...</p>;

  if (!movie) {
    navigate("/404");
    return null;
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section with Movie Banner */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={movie.thumbnail_url}
            alt={movie.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 flex items-end pb-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {movie.title}
            </h1>
            <p className="text-gray-300 text-lg mb-6 line-clamp-3">
              {movie.description}
            </p>
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => navigate(`/movie/${movie.id}/play`)}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                <Play size={20} fill="white" />
                Play Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Description */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-900/50 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-400 leading-relaxed">
                {movie.description}. 
              </p>
            </div>
          </div>

          {/* Right Column - Movie Info */}
          <div className="space-y-6">
            {/* Released Year */}
            <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <Calendar size={18} />
                <span className="text-sm">Released Year</span>
              </div>
              <p className="text-xl font-semibold">{movie.release_year}</p>
            </div>

            {/* Duration */}
            <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <Clock size={18} />
                <span className="text-sm">Duration</span>
              </div>
              <p className="text-xl font-semibold">
                {Math.floor(movie.duration_seconds / 60)} minutes
              </p>
            </div>

            

            {/* Genres */}
            <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4">
              <p className="text-sm text-gray-400 mb-3">Genres</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-600/20 border border-red-600/50 rounded-lg text-sm text-red-400">
                  {movie.category.name}
                </span>
              </div>
            </div>

            {/* Director (Mock) */}
            <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4">
              <p className="text-sm text-gray-400 mb-3">Director</p>
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/150?img=60"
                  alt="Director"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold">Richard Johnson</p>
                  <p className="text-xs text-gray-400">Film Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-red-900/30 to-red-600/30 border border-red-600/50">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200')] opacity-20 bg-cover bg-center"></div>
          <div className="relative p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start your free trial today!
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              This is a clear and concise call to action that encourages users
              to sign up for a free trial of StreamVibe.
            </p>
            <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
              Start a Free Trial
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MovieDetailPage;