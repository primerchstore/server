import { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../libs/prisma.js";
import { ColourValidation } from "../../validations/colour.validation.js";
import Validation from "../../validations/validation.js";
import { Sort } from "../constants/sort.constant.js";
import { ColourQueryResponse } from "../responses/colour.response.js";
import {
  ColourQueryResponseType,
  ColourQueryValidationType,
} from "../types/colour.type.js";

export const colourQuery = async (
  query: ColourQueryValidationType,
): Promise<ColourQueryResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedQuery = Validation.validate(ColourValidation.QUERY, query);
    const { order, page, sort, take, q } = validatedQuery;
    const skip = (page - 1) * take;

    const where: Prisma.ColourWhereInput = {
      ...(q && {
        OR: [
          { id: { contains: q, mode: "insensitive" } },
          { name: { contains: q, mode: "insensitive" } },
          { hexCode: { contains: q, mode: "insensitive" } },
        ],
      }),
    };

    let orderBy: Prisma.ColourOrderByWithRelationInput = {
      [sort]: order,
    };

    if (sort === "variant") {
      orderBy = {
        variants: {
          _count: order as any,
        },
      };
    }

    const [items, totalItems, totalFilters] = await Promise.all([
      tx.colour.findMany({
        where,
        skip,
        take,
        orderBy,
        select: ColourQueryResponse,
      }),
      tx.colour.count(),
      tx.colour.count({ where }),
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
