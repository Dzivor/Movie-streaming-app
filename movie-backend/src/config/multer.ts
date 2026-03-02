import multer, { StorageEngine } from "multer";
import path from "path";
import fs from "fs";

// Ensure upload directories exist
const uploadDirs = {
  thumbnails: "uploads/thumbnails",
  videos: "uploads/videos",
};

Object.values(uploadDirs).forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure storage for thumbnails
const thumbnailStorage: StorageEngine = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, uploadDirs.thumbnails);
  },
  filename: (req: any, file: any, cb: any) => {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// Configure storage for videos
const videoStorage: StorageEngine = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, uploadDirs.videos);
  },
  filename: (req: any, file: any, cb: any) => {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// File filter for images
const imageFileFilter = (req: any, file: any, cb: any) => {
  const allowedMimes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed for thumbnails"));
  }
};

// File filter for videos
const videoFileFilter = (req: any, file: any, cb: any) => {
  const allowedMimes = ["video/mp4", "video/x-matroska", "video/quicktime"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only video files (mp4, mkv, mov) are allowed"));
  }
};

// Export upload middleware instances
export const uploadThumbnail = multer({
  storage: thumbnailStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB for images
  fileFilter: imageFileFilter,
});

export const uploadVideo = multer({
  storage: videoStorage,
  limits: { fileSize: 2 * 1024 * 1024 * 1024 }, // 2GB for videos
  fileFilter: videoFileFilter,
});
