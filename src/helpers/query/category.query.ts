import { Prisma } from "../../generated/prisma/index.js";
import { prisma } from "../../libs/prisma.js";
import { CategoryValidation } from "../../validations/category.validation.js";
import Validation from "../../validations/validation.js";
import { CategoryQueryResponse } from "../responses/category.response.js";
import {
  CategoryQueryResponseType,
  CategoryQueryValidationType,
} from "../types/category.type.js";

export const categoryQuery = async (
  query: CategoryQueryValidationType,
): Promise<CategoryQueryResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedQuery = Validation.validate(CategoryValidation.QUERY, query);
    const { order, page, sort, take, q } = validatedQuery;

    const skip = (page - 1) * take;
    const where: Prisma.CategoryWhereInput = {
      ...(q && {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      }),
    };

    let orderBy: Prisma.CategoryOrderByWithRelationInput = {
      [sort]: order,
    };

    if (sort === "productCount")
      orderBy = { products: { _count: order as any } };

    const [items, totalItems, totalFilters] = await Promise.all([
      prisma.category.findMany({
        where,
        skip,
        take,
        orderBy,
        select: CategoryQueryResponse,
      }),
      prisma.category.count(),
      prisma.category.count({ where }),
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
