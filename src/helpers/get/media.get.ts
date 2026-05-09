import { prisma } from "../../libs/prisma.js";
import { MediaValidation } from "../../validations/media.validation.js";
import Validation from "../../validations/validation.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import { MediaGetResponse } from "../responses/media.response.js";
import {
  MediaGetResponseType,
  MediaGetValidationType,
} from "../types/media.type.js";

export const mediaGet = (
  data: MediaGetValidationType,
): Promise<MediaGetResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedData = Validation.validate(MediaValidation.GET, data);

    const media = await tx.media.findUnique({
      where: {
        [validatedData.by]: validatedData.value,
      },
      select: MediaGetResponse,
    });

    if (!media)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("media"));

    return media;
  });
};
