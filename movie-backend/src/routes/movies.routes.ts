import { Router } from "express";
import { trending, hero, getDetails } from "../controllers/movies.controller";

const router = Router();

router.get("/trending", trending);
router.get("/hero", hero);
router.get("/:id", getDetails);

export default router;
