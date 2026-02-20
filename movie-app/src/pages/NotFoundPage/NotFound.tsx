import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
          404 Error
        </p>
        <h1 className="mt-3 text-4xl md:text-6xl font-extrabold">
          Page not found
        </h1>
        <p className="mt-4 text-gray-300">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="px-6 py-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            to="/Movies"
            className="px-6 py-2 rounded-full border border-white/20 hover:border-white/40 text-gray-200 hover:text-white transition-colors"
          >
            Browse Movies
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
