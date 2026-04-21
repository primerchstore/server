import { prisma } from "../../libs/prisma.js";
import { CartValidation } from "../../validations/cart.validation.js";
import Validation from "../../validations/validation.js";
import { CartVariantAddVariantResponse } from "../responses/cart.response.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import {
  CartVariantAddVariantResponseType,
  CartVariantAddVariantValidationType,
} from "../types/cart.types.js";

export const cartAddVariant = async (
  data: CartVariantAddVariantValidationType,
): Promise<CartVariantAddVariantResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedData = Validation.validate(CartValidation.ADD_VARIANT, data);
    let cart = await tx.cart.findUnique({
      where: { userId: validatedData.userId },
      select: { id: true },
    });
    if (!cart) {
      cart = await tx.cart.create({
        data: {
          userId: validatedData.userId,
        },
        select: { id: true },
      });
    }

    const variant = await tx.variant.findUnique({
      where: { id: validatedData.variantId },
      select: { id: true, stock: true },
    });

    if (!variant)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("variant"));

    if (variant.stock === 0)
      throw new ResponseError(ErrorResponseMessage.BAD_REQUEST("out of stock"));

    const variantCartExist = await tx.variantCart.findUnique({
      where: {
        variantId_cartId: {
          cartId: cart.id,
          variantId: variant.id,
        },
      },
    });

    if (variantCartExist)
      throw new ResponseError(
        ErrorResponseMessage.ALREADY_EXISTS("variantCart"),
      );

    return tx.variantCart.create({
      data: {
        cartId: cart.id,
        variantId: validatedData.variantId,
      },
      select: CartVariantAddVariantResponse,
    });
  });
};
