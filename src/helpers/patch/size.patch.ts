import { prisma } from "../../libs/prisma.js";
import { SizeValidation } from "../../validations/size.validation.js";
import Validation from "../../validations/validation.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import { SizePatchResponse } from "../responses/size.response.js";
import {
  SizePatchResponseType,
  SizePatchValidationType,
} from "../types/size.type.js";

export const sizePatch = async (
  id: string,
  data: SizePatchValidationType,
): Promise<SizePatchResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedData = Validation.validate(SizeValidation.PATCH, data);
    const size = await tx.size.findUnique({
      where: { id },
    });
    if (!size) throw new ResponseError(ErrorResponseMessage.NOT_FOUND("size"));

    if (validatedData.name === size.name) validatedData.name = undefined;
    if (validatedData.code === size.code) validatedData.code = undefined;

    return tx.size.update({
      where: { id },
      data: validatedData,
      select: SizePatchResponse,
    });
  });
};
