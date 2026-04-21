import { prisma } from "../../libs/prisma.js";
import { CartValidation } from "../../validations/cart.validation.js";
import Validation from "../../validations/validation.js";
import { CartVariantDeleteVariantResponse } from "../responses/cart.response.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import {
  CartVariantDeleteValidationType,
  CartVariantDeleteVariantResponseType,
} from "../types/cart.types.js";

export const cartDeleteVariant = async (
  data: CartVariantDeleteValidationType,
): Promise<CartVariantDeleteVariantResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedData = Validation.validate(
      CartValidation.DELETE_VARIANT,
      data,
    );
    const cart = await tx.cart.findFirst({
      where: { userId: validatedData.userId },
      select: { id: true },
    });

    if (!cart) throw new ResponseError(ErrorResponseMessage.NOT_FOUND("cart"));

    const variant = await tx.variant.findUnique({
      where: { id: validatedData.variantId },
      select: { id: true },
    });
    if (!variant)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("variant"));

    const variantCartExist = await tx.variantCart.findUnique({
      where: {
        variantId_cartId: {
          variantId: variant.id,
          cartId: cart.id,
        },
      },
    });

    if (!variantCartExist)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("variantCart"));

    return tx.variantCart.delete({
      where: {
        variantId_cartId: {
          variantId: variant.id,
          cartId: cart.id,
        },
      },
      select: CartVariantDeleteVariantResponse,
    });
  });
};
