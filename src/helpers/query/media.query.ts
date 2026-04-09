import { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../libs/prisma.js";
import { MediaValidation } from "../../validations/media.validation.js";
import Validation from "../../validations/validation.js";
import { MediaQueryResponse } from "../responses/media.response.js";
import {
  MediaQueryResponseType,
  MediaQueryValidationType,
} from "../types/media.type.js";

export const mediaQuery = async (
  query: MediaQueryValidationType,
): Promise<MediaQueryResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedQuery = Validation.validate(MediaValidation.QUERY, query);
    const { order, page, sort, take } = validatedQuery;
    const skip = (page - 1) * take;

    const where: Prisma.MediaWhereInput = {};

    const [items, totalItems, totalFilters] = await Promise.all([
      prisma.media.findMany({
        skip,
        take,
        orderBy: {
          [sort]: order,
        },
        select: MediaQueryResponse,
      }),
      prisma.media.count(),
      prisma.media.count({ where }),
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
