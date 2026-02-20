import { useParams, useNavigate } from "react-router-dom";
import {
  Play,
  Plus,
  ThumbsUp,
  Volume2,
  Clock,
  Calendar,
  Star,
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  trendingMovies,
  actionMovies,
  sciFiMovies,
  dramaMovies,
  comedyMovies,
  newReleases,
} from "../../Data/movie";

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find movie from all available movie arrays
  const allMovies = [
    ...trendingMovies,
    ...actionMovies,
    ...sciFiMovies,
    ...dramaMovies,
    ...comedyMovies,
    ...newReleases,
  ];

  const movie = allMovies.find((m) => m.id === Number(id));

  // If movie not found, redirect to 404
  if (!movie) {
    navigate("/404");
    return null;
  }

  // Mock data for additional details (template data)
  const mockCast = [
    {
      name: "John Anderson",
      role: "Lead Actor",
      image: "https://i.pravatar.cc/150?img=12",
    },
    {
      name: "Sarah Mitchell",
      role: "Lead Actress",
      image: "https://i.pravatar.cc/150?img=5",
    },
    {
      name: "Michael Chen",
      role: "Supporting",
      image: "https://i.pravatar.cc/150?img=33",
    },
    {
      name: "Emily Rodriguez",
      role: "Supporting",
      image: "https://i.pravatar.cc/150?img=9",
    },
    {
      name: "David Thompson",
      role: "Villain",
      image: "https://i.pravatar.cc/150?img=15",
    },
    {
      name: "Lisa Park",
      role: "Director",
      image: "https://i.pravatar.cc/150?img=20",
    },
  ];

  const mockReviews = [
    {
      author: "Alex Johnson",
      rating: 4.5,
      date: "2 days ago",
      comment:
        "This movie was recommended to me by a very good friend of mine. I wasn't sure if I really want to see the movie at first but boy I was pleasantly surprised!",
    },
    {
      author: "Maria Garcia",
      rating: 5,
      date: "1 week ago",
      comment:
        "A timeless king protects his lands to the local village. Powerful visuals, strong performances and peace of mind.",
    },
  ];

  const languages = ["English", "Hindi", "Tamil", "Telugu", "Kannada"];
  const ratings = { imdb: 8.5, streamvibe: 4.6 };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* Hero Section with Movie Banner */}
      <div className="relative h-[70vh] overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <img
            src={movie.thumbnail}
            alt={movie.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
        </div>

        {/* Movie Info Overlay */}
        <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 flex items-end pb-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {movie.title}
            </h1>
            <p className="text-gray-300 text-lg mb-6 line-clamp-3">
              {movie.description}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mb-6">
              <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                <Play size={20} fill="white" />
                Play Now
              </button>
              <button
                className="p-3 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-colors duration-300"
                aria-label="Add to watchlist"
              >
                <Plus size={20} />
              </button>
              <button
                className="p-3 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-colors duration-300"
                aria-label="Like this movie"
              >
                <ThumbsUp size={20} />
              </button>
              <button
                className="p-3 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-colors duration-300"
                aria-label="Toggle audio"
              >
                <Volume2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Description & Cast */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-gray-900/50 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-400 leading-relaxed">
                {movie.description}. This cinematic masterpiece takes viewers on
                an unforgettable journey filled with emotion, action, and
                thought-provoking moments. With stunning visuals and a
                compelling narrative, this film has captivated audiences
                worldwide and earned critical acclaim.
              </p>
            </div>

            {/* Cast */}
            <div className="bg-gray-900/50 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Cast</h2>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {mockCast.map((actor, index) => (
                  <div key={index} className="flex-shrink-0">
                    <img
                      src={actor.image}
                      alt={actor.name}
                      className="w-20 h-20 rounded-full object-cover mb-2"
                    />
                    <p className="text-sm font-medium text-center">
                      {actor.name}
                    </p>
                    <p className="text-xs text-gray-400 text-center">
                      {actor.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-gray-900/50 border border-white/10 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Reviews</h2>
                <button className="text-red-500 hover:text-red-400 text-sm font-medium">
                  + Add Your Review
                </button>
              </div>

              <div className="space-y-6">
                {mockReviews.map((review, index) => (
                  <div
                    key={index}
                    className="border-b border-white/10 pb-6 last:border-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{review.author}</h3>
                        <p className="text-xs text-gray-400">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star
                          size={16}
                          fill="#EF4444"
                          className="text-red-500"
                        />
                        <span className="font-semibold">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
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
              <p className="text-xl font-semibold">{movie.releaseYear}</p>
            </div>

            {/* Duration */}
            <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <Clock size={18} />
                <span className="text-sm">Duration</span>
              </div>
              <p className="text-xl font-semibold">
                {movie.durationMinutes} minutes
              </p>
            </div>

            {/* Available Languages */}
            <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-3">
                <Volume2 size={18} />
                <span className="text-sm">Available Languages</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 bg-black/50 border border-white/10 rounded-lg text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Ratings */}
            <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-3">
                <Star size={18} />
                <span className="text-sm">Ratings</span>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1">IMDb</p>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={
                            i < Math.floor(ratings.imdb / 2)
                              ? "#EF4444"
                              : "none"
                          }
                          className="text-red-500"
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{ratings.imdb}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">StreamVibe</p>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={
                            i < Math.floor(ratings.streamvibe)
                              ? "#EF4444"
                              : "none"
                          }
                          className="text-red-500"
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{ratings.streamvibe}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Genres */}
            <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4">
              <p className="text-sm text-gray-400 mb-3">Genres</p>
              <div className="flex flex-wrap gap-2">
                {movie.categories.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-red-600/20 border border-red-600/50 rounded-lg text-sm text-red-400"
                  >
                    {category}
                  </span>
                ))}
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
