import { Router } from "express";
import {
  start,
  updatePosition,
  getPosition,
} from "../controllers/watch-sessions.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

// All watch session routes require authentication
router.use(authenticateToken);

router.post("/start", start);
router.patch("/update-position", updatePosition);
router.get("/:movie_id", getPosition);

export default router;
