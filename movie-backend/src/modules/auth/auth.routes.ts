import { Router } from "express";
import { login, register, refresh, getCurrentUser } from "./auth.controller";
import { validate } from "../../middlewares/validation.middleware";
import {
  loginSchema,
  registerSchema,
  refreshTokenSchema,
  RegisterDTO,
  LoginDTO,
  RefreshTokenDTO,
} from "../../validation/auth.validation";
import { authLimiter } from "../../middlewares/rateLimit.middleware";
import { authenticateToken } from "../../middlewares/auth.middleware";

const router = Router();

router.post(
  "/register",
  authLimiter,
  validate<RegisterDTO>(registerSchema),
  register,
);
router.post("/login", authLimiter, validate<LoginDTO>(loginSchema), login);
router.post("/refresh", validate<RefreshTokenDTO>(refreshTokenSchema), refresh);
router.get("/me", authenticateToken, getCurrentUser);

export default router;
