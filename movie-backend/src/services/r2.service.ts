import { randomUUID } from "crypto";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { r2Client, r2Config } from "../config/r2.config";

export type FileType = "thumbnail" | "video";

export interface UploadedFile {
  key: string;
  url: string;
}

/**
 * Uploads a file to Cloudflare R2 bucket
 * @param file - Multer file object (with buffer from memory storage)
 * @param fileType - Type of file (thumbnail or video)
 * @param movieIdSeed - Optional ID for organizing files (uses UUID if not provided)
 * @returns Object containing the R2 key and public URL
 */
export const uploadToR2 = async (
  file: Express.Multer.File,
  fileType: FileType,
  movieIdSeed?: string,
): Promise<UploadedFile> => {
  try {
    const seed = movieIdSeed || randomUUID();
    const ext = getFileExtension(file.mimetype);
    const key = `movies/${seed}/${fileType}.${ext}`;

    const uploader = new Upload({
      client: r2Client,
      params: {
        Bucket: r2Config.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      },
    });

    await uploader.done();

    return {
      key,
      url: r2Config.publicBaseUrl ? `${r2Config.publicBaseUrl}/${key}` : key,
    };
  } catch (error) {
    console.error("R2 upload failed:", error);
    throw new Error(`Failed to upload ${fileType} to R2 storage`);
  }
};

/**
 * Deletes a file from R2 bucket
 * @param key - The R2 object key to delete
 */
export const deleteFromR2 = async (key: string): Promise<void> => {
  try {
    await r2Client.send(
      new DeleteObjectCommand({
        Bucket: r2Config.bucket,
        Key: key,
      }),
    );
  } catch (error) {
    console.error("R2 delete failed:", error);
    throw new Error("Failed to delete file from R2 storage");
  }
};

/**
 * Extracts file extension from MIME type
 * @param mimetype - MIME type string (e.g., "image/jpeg")
 * @returns File extension (e.g., "jpeg")
 */
const getFileExtension = (mimetype: string): string => {
  const parts = mimetype.split("/");
  return parts[1] || "bin";
};
