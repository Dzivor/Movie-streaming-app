import { Router } from "express";
import multer, { StorageEngine } from "multer";
import { upload, getLogs } from "../controllers/admin.controller";
import { authenticateToken } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";
import { uploadThumbnail, uploadVideo } from "../config/multer";

const router = Router();

// Middleware to protect admin routes
router.use(authenticateToken);
router.use(requireRole("admin"));

// Combine both upload instances for handling multiple file types
const storage: StorageEngine = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    if (file.fieldname === "thumbnail") {
      cb(null, "uploads/thumbnails");
    } else if (file.fieldname === "video") {
      cb(null, "uploads/videos");
    }
  },
  filename: (req: any, file: any, cb: any) => {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${file.mimetype.split("/")[1]}`;
    cb(null, uniqueName);
  },
});

const upload_handler = multer({
  storage,
  limits: {
    fieldSize: 10 * 1024 * 1024,
    fileSize: 2 * 1024 * 1024 * 1024,
  },
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

export default router;
