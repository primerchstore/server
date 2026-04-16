import { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../libs/prisma.js";
import { SizeValidation } from "../../validations/size.validation.js";
import Validation from "../../validations/validation.js";
import { SizeQueryResponse } from "../responses/size.response.js";
import {
  SizeQueryResponseType,
  SizeQueryValidationType,
} from "../types/size.type.js";

export const sizeQuery = async (
  query: SizeQueryValidationType,
): Promise<SizeQueryResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedQuery = Validation.validate(SizeValidation.QUERY, query);
    const { order, page, sort, take, q } = validatedQuery;
    const skip = (page - 1) * take;

    const where: Prisma.SizeWhereInput = {
      ...(q && {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { code: { contains: q, mode: "insensitive" } },
        ],
      }),
    };

    let orderBy: Prisma.SizeOrderByWithRelationInput = {
      [sort]: order,
    };

    const [items, totalItems, totalFilters] = await Promise.all([
      tx.size.findMany({
        where,
        skip,
        take,
        orderBy,
        select: SizeQueryResponse,
      }),
      tx.size.count(),
      tx.size.count({ where }),
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
