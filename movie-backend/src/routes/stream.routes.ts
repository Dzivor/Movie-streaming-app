import { Router } from "express";
import { getToken, verify } from "../controllers/stream.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

// All stream routes require authentication
router.use(authenticateToken);

router.get("/token/:movieId", getToken);
router.post("/verify", verify);

export default router;
