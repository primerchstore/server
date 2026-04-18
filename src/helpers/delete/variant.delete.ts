import { prisma } from "../../libs/prisma.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import { VariantDeleteResponse } from "../responses/variant.response.js";
import { VariantDeleteResponseType } from "../types/variant.type.js";

export const variantDelete = async (
  id: string,
): Promise<VariantDeleteResponseType> => {
  return prisma.$transaction(async (tx) => {
    const variant = await tx.variant.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!variant)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("variant"));

    return tx.variant.delete({ where: { id }, select: VariantDeleteResponse });
  });
};
