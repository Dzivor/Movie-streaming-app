import { Router } from "express";
import { getCategories, getCategory } from "../controllers/category.controller";

const router = Router();

router.get("/", getCategories);
router.get("/:id", getCategory);

export default router;
