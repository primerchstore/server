import { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../libs/prisma.js";
import { AddressValidation } from "../../validations/address.validation.js";
import Validation from "../../validations/validation.js";
import { AddressQueryResponse } from "../responses/address.response.js";
import {
  AddressQueryResponseType,
  AddressQueryValidationType,
} from "../types/address.type.js";

export const addressQuery = async (
  userId: string,
  query: AddressQueryValidationType,
): Promise<AddressQueryResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedQuery = Validation.validate(AddressValidation.QUERY, query);
    const { order, page, sort, take, q } = validatedQuery;

    const skip = (page - 1) * take;
    const where: Prisma.AddressWhereInput = {
      userId,
      ...(q && {
        OR: [
          { recipient: { contains: q, mode: "insensitive" } },
          { street: { contains: q, mode: "insensitive" } },
          { province: { contains: q, mode: "insensitive" } },
          { city: { contains: q, mode: "insensitive" } },
          { phone: { contains: q, mode: "insensitive" } },
          { postalCode: { contains: q, mode: "insensitive" } },
        ],
      }),
    };

    const orderBy: Prisma.AddressOrderByWithRelationInput = {
      [sort]: order,
    };

    const [items, totalItems, totalFilters] = await Promise.all([
      tx.address.findMany({
        where,
        skip,
        take,
        orderBy,
        select: AddressQueryResponse,
      }),
      tx.address.count(),
      tx.address.count({ where }),
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
