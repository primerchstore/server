import { UploadApiResponse } from "cloudinary";
import { MediaPostResponseType } from "../types/media.type.js";
import { prisma } from "../../libs/prisma.js";
import { MediaPostReponse } from "../responses/media.response.js";

export const mediaPost = async (
  cloudinary: UploadApiResponse,
): Promise<MediaPostResponseType> => {
  return prisma.$transaction(async (tx) => {
    return tx.media.create({
      data: {
        url: cloudinary.secure_url,
        publicId: cloudinary.public_id,
        type: "IMAGE",
      },
      select: MediaPostReponse,
    });
  });
};
