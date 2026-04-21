import { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../libs/prisma.js";
import { CartValidation } from "../../validations/cart.validation.js";
import Validation from "../../validations/validation.js";
import { CartVariantQueryResponse } from "../responses/cart.response.js";
import {
  CartVariantQueryResponseType,
  CartVariantQueryValidationType,
} from "../types/cart.types.js";

export const cartQueryVariant = async (
  data: CartVariantQueryValidationType,
): Promise<CartVariantQueryResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedData = Validation.validate(
      CartValidation.QUERY_VARIANT,
      data,
    );
    const { order, page, sort, take, userId } = validatedData;
    let cart = await tx.cart.findFirst({
      where: { userId },
      select: { id: true },
    });

    if (!cart) {
      cart = await tx.cart.create({
        data: { userId },
        select: { id: true },
      });
    }

    const skip = (page - 1) * take;

    const where: Prisma.VariantCartWhereInput = {
      cartId: cart.id,
    };

    let orderBy: Prisma.VariantCartOrderByWithRelationInput = {
      [sort]: order,
    };

    const [items, totalItems, totalFilters] = await Promise.all([
      tx.variantCart.findMany({
        where,
        skip,
        take,
        orderBy,
        select: CartVariantQueryResponse,
      }),
      tx.variantCart.count({ where }),
      tx.variantCart.count({ where }),
    ]);

    const totalPages = Math.ceil(totalFilters / take);
    return {
      query: items,
      pagination: {
        page,
        take,
        totalItems,
        totalFilters,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  });
};
