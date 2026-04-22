import { prisma } from "../../libs/prisma.js";
import Validation from "../../validations/validation.js";
import { WishlistValidation } from "../../validations/wishlist.validation.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import { WishlistPostResponse } from "../responses/wishlist.response.js";
import {
  WishlistPostResponseType,
  WishlistPostValidationType,
} from "../types/wishlist.type.js";

export const wishlistPost = async (
  data: WishlistPostValidationType,
): Promise<WishlistPostResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedData = Validation.validate(WishlistValidation.POST, data);
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

    if (whistlistProduct)
      throw new ResponseError(ErrorResponseMessage.ALREADY_EXISTS("wishlist"));
    return tx.wishlist.create({
      data: validatedData,
      select: WishlistPostResponse,
    });
  });
};
