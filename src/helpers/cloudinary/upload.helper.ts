import { UploadApiResponse } from "cloudinary";
import cloudinary from "../../libs/cloudinary.js";

export function uploadToCloudinary(
  buffer: Buffer,
  folder = "uploads",
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error || !result)
          return reject(error ?? new Error("Upload failed"));
        resolve(result);
      },
    );
    stream.end(buffer);
  });
}
