import { Router } from "express";
import {
  getUsers,
  getUser,
  updateUserRoleHandler,
  deactivateUserHandler,
} from "../controllers/users.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

// Protect all user routes with authentication and admin role
router.use(authenticateToken);
router.use(requireRole("admin"));

// Get all users (paginated)
router.get("/", getUsers);

// Get single user by ID
router.get("/:id", getUser);

// Update user role
router.put("/:id/role", updateUserRoleHandler);

// Deactivate user
router.delete("/:id", deactivateUserHandler);

export default router;
