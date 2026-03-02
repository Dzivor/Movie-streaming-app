import { AlertCircle, ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  actionMovies,
  comedyMovies,
  dramaMovies,
  newReleases,
  sciFiMovies,
  trendingMovies,
} from "../../Data/movie";

const PlayMoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [streamError, setStreamError] = useState(false);

  const allMovies = useMemo(
    () => [
      ...trendingMovies,
      ...actionMovies,
      ...sciFiMovies,
      ...dramaMovies,
      ...comedyMovies,
      ...newReleases,
    ],
    [],
  );

  const movie = allMovies.find((item) => item.id === Number(id));
  const streamBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const streamUrl = `${streamBaseUrl}/stream/${id}`;
  const demoStreamUrl =
    import.meta.env.VITE_DEMO_VIDEO_URL ||
    "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const handleKeyboardShortcuts = (event: KeyboardEvent) => {
      const video = videoRef.current;
      if (!video) return;

      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (event.code === "Space" || event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (video.paused) {
          void video.play();
        } else {
          video.pause();
        }
      }

      if (event.key.toLowerCase() === "m") {
        event.preventDefault();
        video.muted = !video.muted;
      }

      if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        if (document.fullscreenElement) {
          void document.exitFullscreen();
        } else {
          void video.requestFullscreen();
        }
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        video.currentTime = Math.min(
          video.currentTime + 5,
          video.duration || Infinity,
        );
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        video.currentTime = Math.max(video.currentTime - 5, 0);
      }
    };

    window.addEventListener("keydown", handleKeyboardShortcuts);
    return () => window.removeEventListener("keydown", handleKeyboardShortcuts);
  }, []);

  if (!movie) {
    navigate("/404");
    return null;
  }

  return (
    <main className="bg-black text-white min-h-screen">
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-5 md:py-6 space-y-4 md:space-y-5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Details
          </button>
          <p className="text-sm text-gray-400">Now Playing</p>
        </div>

        <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-gray-900/40">
          <div className="aspect-video w-full relative">
            <video
              ref={videoRef}
              controls
              autoPlay
              poster={movie.thumbnail}
              className="w-full h-full object-cover bg-black"
              onError={() => setStreamError(true)}
              onLoadedData={() => {
                const currentSrc = videoRef.current?.currentSrc || "";
                setUsingFallback(currentSrc.includes("flower.mp4"));
                setStreamError(false);
              }}
            >
              <source src={streamUrl} type="video/mp4" />
              <source src={demoStreamUrl} type="video/mp4" />
              Your browser does not support HTML video playback.
            </video>

            <div className="absolute top-3 right-3 bg-black/60 border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] text-gray-200">
              Shortcuts: K/Space Play-Pause • ←/→ Seek • M Mute • F Fullscreen
            </div>

            {usingFallback && !streamError && (
              <div className="absolute top-3 left-3 bg-yellow-500/20 border border-yellow-400/30 rounded-lg px-2.5 py-1.5 text-[11px] text-yellow-200">
                Preview mode: demo video loaded (backend stream not available
                yet)
              </div>
            )}

            {streamError && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4">
                <div className="max-w-md text-center space-y-3">
                  <div className="inline-flex items-center justify-center">
                    <AlertCircle className="text-red-400" size={28} />
                  </div>
                  <h2 className="text-xl font-semibold">Stream unavailable</h2>
                  <p className="text-sm text-gray-300">
                    The movie stream could not be loaded. Confirm your backend
                    stream endpoint is active at
                    <span className="text-white"> {streamUrl}</span> and try
                    again.
                  </p>
                  <button
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    className="mt-2 px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
                  >
                    Back to Details
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <section className="space-y-1.5 md:space-y-2">
          <h2 className="text-lg md:text-xl font-semibold">About this movie</h2>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed">
            {movie.description}
          </p>
          <p className="text-sm text-gray-400">
            {movie.releaseYear} • {movie.durationMinutes} min •{" "}
            {movie.categories.join(" • ")}
          </p>
        </section>
      </section>
    </main>
  );
};

export default PlayMoviePage;
