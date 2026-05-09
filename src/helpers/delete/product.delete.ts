import { prisma } from "../../libs/prisma.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import { ProductDeleteResponse } from "../responses/product.response.js";
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

    const variants = await tx.variant.findMany({
      where: { productId: product.id },
      select: { id: true },
    });
    if (variants.length > 0)
      await tx.variant.deleteMany({
        where: { id: { in: variants.map((v) => v.id) } },
      });

    const reviews = await tx.review.findMany({
      where: { productId: product.id },
      select: { id: true },
    });

    if (reviews.length > 0)
      await tx.review.deleteMany({
        where: { id: { in: reviews.map((v) => v.id) } },
      });

    const medias = await tx.productMedia.findMany({
      where: { productId: product.id },
      select: { id: true },
    });

    if (medias.length > 0)
      await tx.productMedia.deleteMany({
        where: { productId: product.id },
      });

    return tx.product.delete({ where: { id }, select: ProductDeleteResponse });
  });
};
