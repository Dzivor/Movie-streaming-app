import React from "react";
import { useNavigate } from "react-router-dom";

interface RouteErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
}

export const RouteErrorFallback: React.FC<RouteErrorFallbackProps> = ({
  error,
  resetError,
}) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    if (resetError) resetError();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-3">Page Error</h2>
          <p className="text-gray-400 mb-6">
            This page encountered an error. Please try refreshing or return to
            the homepage.
          </p>

          {import.meta.env.DEV && error && (
            <div className="text-left mb-6 bg-gray-900/50 p-4 rounded-lg border border-red-600/30 text-sm">
              <p className="text-red-400 font-mono">{error.message}</p>
            </div>
          )}

          <button
            onClick={handleGoHome}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default RouteErrorFallback;
