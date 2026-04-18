import { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../libs/prisma.js";
import Validation from "../../validations/validation.js";
import { VariantValidation } from "../../validations/variant.validation.js";
import { VariantQueryResponse } from "../responses/variant.response.js";
import {
  VariantQueryResponseType,
  VariantQueryValidationType,
} from "../types/variant.type.js";

export const variantQuery = async (
  query: VariantQueryValidationType,
): Promise<VariantQueryResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedQuery = Validation.validate(VariantValidation.QUERY, query);
    const { order, page, sort, take, colour, q, size, sku } = validatedQuery;
    const skip = (page - 1) * take;

    const where: Prisma.VariantWhereInput = {
      ...(q && {
        product: {
          name: {
            contains: q,
            mode: "insensitive",
          },
        },
      }),
      ...(size && {
        size: {
          name: {
            contains: size,
            mode: "insensitive",
          },
        },
      }),
      ...(colour && {
        colour: {
          name: {
            contains: size,
            mode: "insensitive",
          },
        },
      }),
      ...(sku && {
        sku: {
          contains: sku,
          mode: "insensitive",
        },
      }),
    };

    let orderBy: Prisma.VariantOrderByWithRelationInput = {
      [sort]: order,
    };

    const [items, totalItems, totalFilters] = await Promise.all([
      tx.variant.findMany({
        where,
        skip,
        take,
        orderBy,
        select: VariantQueryResponse,
      }),
      tx.variant.count(),
      tx.variant.count({ where }),
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
