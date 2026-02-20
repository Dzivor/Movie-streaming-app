import { Route, Routes } from "react-router";
import HomePage from "../pages/Homepage/Homepage";
import MoviePage from "../pages/MoviePage/MoviePage";
import SignUpPage from "../pages/Sign-up/SignUpPage";
import NotFound from "../pages/NotFoundPage/NotFound";
import MovieDetailPage from "../pages/MovieDetailPage/MovieDetailPage";
import { ErrorBoundary, RouteErrorFallback } from "../components/ErrorBoundary";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary fallback={<RouteErrorFallback />}>
              <HomePage />
            </ErrorBoundary>
          }
        />
        <Route
          path="/Movies"
          element={
            <ErrorBoundary fallback={<RouteErrorFallback />}>
              <MoviePage />
            </ErrorBoundary>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <ErrorBoundary fallback={<RouteErrorFallback />}>
              <MovieDetailPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="/Sign Up"
          element={
            <ErrorBoundary fallback={<RouteErrorFallback />}>
              <SignUpPage />
            </ErrorBoundary>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
