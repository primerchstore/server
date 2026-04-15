import { prisma } from "../../libs/prisma.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import { ProductDeleteResponseType } from "../types/product.type.js";

export const productDelete = async (
  id: string,
): Promise<ProductDeleteResponseType> => {
  return prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!product)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("product"));

    return tx.product.delete({ where: { id }, select: { id: true } });
  });
};
