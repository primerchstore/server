import { prisma } from "../../libs/prisma.js";
import { SizeValidation } from "../../validations/size.validation.js";
import Validation from "../../validations/validation.js";
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
    return tx.size.create({
      data: validatedData,
      select: SizePostResponse,
    });
  });
};
