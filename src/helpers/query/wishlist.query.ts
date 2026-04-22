import { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../libs/prisma.js";
import Validation from "../../validations/validation.js";
import { WishlistValidation } from "../../validations/wishlist.validation.js";
import { WishlistQueryResponse } from "../responses/wishlist.response.js";
import {
  WishlistQueryResponseType,
  WishlistQueryValidationType,
} from "../types/wishlist.type.js";

export const wishlistQuery = (
  query: WishlistQueryValidationType,
): Promise<WishlistQueryResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedQuery = Validation.validate(WishlistValidation.QUERY, query);
    const { order, page, sort, take, q, userId } = validatedQuery;
    const skip = (page - 1) * take;

    const where: Prisma.WishlistWhereInput = {
      userId,
      ...(q && {
        product: {
          name: { contains: q, mode: "insensitive" },
        },
      }),
    };

    const orderBy: Prisma.WishlistOrderByWithRelationInput = {
      [sort]: order,
    };

    const [items, totalItems, totalFilters] = await Promise.all([
      tx.wishlist.findMany({
        where,
        skip,
        take,
        orderBy,
        select: WishlistQueryResponse,
      }),
      tx.wishlist.count({ where }),
      tx.wishlist.count({ where }),
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
