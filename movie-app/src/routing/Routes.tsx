import { Route, Routes } from "react-router";
import HomePage from "../pages/Homepage/Homepage";
import MoviePage from "../pages/MoviePage/MoviePage";
import SignUpPage from "../pages/Sign-up/SignUpPage";
import NotFound from "../pages/NotFoundPage/NotFound";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Movies" element={<MoviePage />} />
        <Route path="/Sign Up" element={<SignUpPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
