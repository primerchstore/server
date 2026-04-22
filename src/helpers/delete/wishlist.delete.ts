import { prisma } from "../../libs/prisma.js";
import Validation from "../../validations/validation.js";
import { WishlistValidation } from "../../validations/wishlist.validation.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import { WishlistDeleteResponse } from "../responses/wishlist.response.js";
import {
  WishlistDeleteResponseType,
  WishlistDeleteValidationType,
} from "../types/wishlist.type.js";

export const wishlistDelete = async (
  data: WishlistDeleteValidationType,
): Promise<WishlistDeleteResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedData = Validation.validate(WishlistValidation.DELETE, data);
    const { productId, userId } = validatedData;
    const product = await tx.product.findUnique({
      where: { id: productId },
      select: { id: true },
    });
    if (!product)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("product"));
    const whistlistProduct = await tx.wishlist.findFirst({
      where: {
        productId,
        userId,
      },
      select: { id: true },
    });

    if (!whistlistProduct)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("wishlist"));
    return tx.wishlist.delete({
      where: { id: whistlistProduct.id },
      select: WishlistDeleteResponse,
    });
  });
};
