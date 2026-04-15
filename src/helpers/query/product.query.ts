import { Prisma } from "../../generated/prisma/index.js";
import { prisma } from "../../libs/prisma.js";
import { ProductValidation } from "../../validations/product.validation.js";
import Validation from "../../validations/validation.js";
import { ProductQueryResponse } from "../responses/product.response.js";
import {
  ProductQueryResponseType,
  ProductQueryValidationType,
} from "../types/product.type.js";

export const productQuery = async (
  query: ProductQueryValidationType,
): Promise<ProductQueryResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedQuery = Validation.validate(ProductValidation.QUERY, query);
    const { order, page, sort, take, q, category, tags } = validatedQuery;

    const skip = (page - 1) * take;
    const where: Prisma.ProductWhereInput = {
      ...(q && {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      }),

      ...(category && {
        category: {
          slug: { contains: category, mode: "insensitive" },
        },
      }),

      ...(tags &&
        tags.length > 0 && {
          tags: {
            some: {
              tag: {
                slug: { in: tags },
              },
            },
          },
        }),
    };

    let orderBy: Prisma.ProductOrderByWithRelationInput = {
      [sort]: order,
    };

    const [items, totalItems, totalFilters] = await Promise.all([
      tx.product.findMany({
        where,
        skip,
        take,
        orderBy,
        select: ProductQueryResponse,
      }),
      tx.product.count(),
      tx.product.count({ where }),
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
