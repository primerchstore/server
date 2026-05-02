import { prisma } from "../../libs/prisma.js";
import { SizeValidation } from "../../validations/size.validation.js";
import Validation from "../../validations/validation.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import { SizePostResponse } from "../responses/size.response.js";
import {
  SizePostResponseType,
  SizePostValidationType,
} from "../types/size.type.js";

export const sizePost = async (
  data: SizePostValidationType,
): Promise<SizePostResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedData = Validation.validate(SizeValidation.POST, data);
    const sizeExist = await tx.size.findFirst({
      where: {
        name: validatedData.name,
        code: validatedData.code,
      },
    });
    if (sizeExist)
      throw new ResponseError(ErrorResponseMessage.ALREADY_EXISTS("size"));
    return tx.size.create({
      data: validatedData,
      select: SizePostResponse,
    });
  });
};
