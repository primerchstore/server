import {
  MediaDeleteResponseType,
  MediaDeleteValidationType,
} from "../types/media.type.js";
import Validation from "../../validations/validation.js";
import { MediaValidation } from "../../validations/media.validation.js";
import { prisma } from "../../libs/prisma.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import cloudinary from "../../libs/cloudinary.js";

export const mediaDelete = async (
  id: MediaDeleteValidationType,
): Promise<MediaDeleteResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedId = Validation.validate(MediaValidation.DELETE, id);
    const media = await tx.media.findUnique({
      where: { id: validatedId.id },
      select: { id: true, publicId: true },
    });
    if (!media)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("media"));

    if (media.publicId) {
      const decoded = decodeURIComponent(media.publicId).replace(/~/g, "/");
      await cloudinary.uploader.destroy(decoded);
    }

    return tx.media.delete({
      where: { id: validatedId.id },
      select: { id: true },
    });
  });
};
