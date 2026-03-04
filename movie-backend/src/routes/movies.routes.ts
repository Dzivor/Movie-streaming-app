import { Router } from "express";
import {
  trending,
  hero,
  getDetails,
  getMovies,
  search,
  getByCategory,
  editMovie,
  removeMovie,
} from "../controllers/movies.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

// Public routes
router.get("/", getMovies);
router.get("/trending", trending);
router.get("/hero", hero);
router.get("/search", search);
router.get("/category/:categoryId", getByCategory);
router.get("/:id", getDetails);

// Admin routes
router.put(
  "/:id",
  authenticateToken,
  requireRole("admin"),
  editMovie,
);
router.delete(
  "/:id",
  authenticateToken,
  requireRole("admin"),
  removeMovie,
);

export default router;
