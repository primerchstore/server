import { prisma } from "../../libs/prisma.js";
import { CartValidation } from "../../validations/cart.validation.js";
import Validation from "../../validations/validation.js";
import { CartVariantUpdateQuantityVariantResponse } from "../responses/cart.response.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import {
  CartVariantUpdateQuantityResponseType,
  CartVariantUpdateQuantityValidationType,
} from "../types/cart.types.js";

export const cartUpdateQuantity = async (
  data: CartVariantUpdateQuantityValidationType,
): Promise<CartVariantUpdateQuantityResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedData = Validation.validate(
      CartValidation.UPDATE_QUANTITY,
      data,
    );
    const cart = await tx.cart.findUnique({
      where: { userId: validatedData.userId },
      select: { id: true },
    });
    if (!cart) throw new ResponseError(ErrorResponseMessage.NOT_FOUND("cart"));
    const variant = await tx.variant.findUnique({
      where: { id: validatedData.variantId },
      select: { id: true, stock: true },
    });
    if (!variant)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("variant"));

    const variantCartExist = await tx.variantCart.findFirst({
      where: {
        cartId: cart.id,
        variantId: variant.id,
      },
    });

    if (!variantCartExist)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("variantCart"));

    if (validatedData.quantity > variant.stock)
      throw new ResponseError(
        ErrorResponseMessage.BAD_REQUEST("limit of stock"),
      );

    return tx.variantCart.update({
      where: {
        variantId_cartId: {
          variantId: variant.id,
          cartId: cart.id,
        },
      },
      data: {
        quantity: validatedData.quantity,
      },
      select: CartVariantUpdateQuantityVariantResponse,
    });
  });
};
