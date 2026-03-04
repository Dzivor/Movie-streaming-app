import { Router } from "express";
import multer from "multer";
import {
  upload,
  getLogs,
  addCategory,
  getCategories,
  getCategory,
  editCategory,
  removeCategory,
} from "../controllers/admin.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createCategorySchema,
  CreateCategoryDTO,
} from "../validation/category.validation";

const router = Router();

// Middleware to protect admin routes
router.use(authenticateToken);
router.use(requireRole("admin"));

// File filter for validating file types
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedImageMimes = ["image/jpeg", "image/png", "image/gif"];
  const allowedVideoMimes = [
    "video/mp4",
    "video/x-matroska",
    "video/quicktime",
  ];

  if (file.fieldname === "thumbnail") {
    if (allowedImageMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only image files (jpeg, png, gif) are allowed for thumbnails",
        ),
      );
    }
  } else if (file.fieldname === "video") {
    if (allowedVideoMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only video files (mp4, mkv, mov) are allowed"));
    }
  } else {
    cb(new Error("Unexpected field"));
  }
};

// Configure multer with memory storage for R2 upload
const upload_handler = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldSize: 10 * 1024 * 1024,
    fileSize: 2 * 1024 * 1024 * 1024, // 2GB max
  },
  fileFilter,
});

router.post(
  "/upload",
  upload_handler.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  upload,
);

router.get("/logs", getLogs);

router.post(
  "/categories",
  validate<CreateCategoryDTO>(createCategorySchema),
  addCategory,
);
router.get("/categories", getCategories);
router.get("/categories/:id", getCategory);
router.put(
  "/categories/:id",
  validate<CreateCategoryDTO>(createCategorySchema),
  editCategory,
);
router.delete("/categories/:id", removeCategory);

export default router;
