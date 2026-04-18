import { prisma } from "../../libs/prisma.js";
import Validation from "../../validations/validation.js";
import { VariantValidation } from "../../validations/variant.validation.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import { VariantGetResponse } from "../responses/variant.response.js";
import {
  VariantGetResponseType,
  VariantGetValidationType,
} from "../types/variant.type.js";

export const variantGet = async (
  data: VariantGetValidationType,
): Promise<VariantGetResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedData = Validation.validate(VariantValidation.GET, data);
    const variant = await tx.variant.findUnique({
      where: {
        id: validatedData.value,
      },
      select: VariantGetResponse,
    });

    if (!variant)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("variant"));

    return variant;
  });
};
