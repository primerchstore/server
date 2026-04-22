import { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../libs/prisma.js";
import { OrderValidation } from "../../validations/order.validation.js";
import Validation from "../../validations/validation.js";
import { OrderQueryResponse } from "../responses/order.response.js";
import {
  OrderAdminQueryValidationType,
  OrderQueryResponseType,
  OrderQueryValidationType,
} from "../types/order.type.js";

export const orderQuery = async (
  data: OrderQueryValidationType,
): Promise<OrderQueryResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedData = Validation.validate(OrderValidation.QUERY, data);
    const { order, page, sort, take, userId, q } = validatedData;

    const skip = (page - 1) * take;

    const where: Prisma.OrderWhereInput = {
      userId,
      ...(q && {
        items: {
          some: {
            variant: {
              product: {
                name: { contains: q, mode: "insensitive" },
              },
            },
          },
        },
      }),
    };

    const orderBy: Prisma.OrderOrderByWithRelationInput = {
      [sort]: order,
    };

    const [items, totalItems, totalFilters] = await Promise.all([
      tx.order.findMany({
        where,
        skip,
        take,
        orderBy,
        select: OrderQueryResponse,
      }),
      tx.order.count({ where }),
      tx.order.count({ where }),
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

export const orderAdminQuery = async (
  data: OrderAdminQueryValidationType,
): Promise<OrderQueryResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedData = Validation.validate(OrderValidation.QUERY, data);
    const { order, page, sort, take, q } = validatedData;

    const skip = (page - 1) * take;

    const where: Prisma.OrderWhereInput = {
      ...(q && {
        OR: [
          {
            items: {
              some: {
                variant: {
                  product: {
                    name: { contains: q, mode: "insensitive" },
                  },
                },
              },
            },
          },
          {
            user: {
              OR: [
                { email: { contains: q, mode: "insensitive" } },
                { name: { contains: q, mode: "insensitive" } },
              ],
            },
          },
        ],
      }),
    };

    const orderBy: Prisma.OrderOrderByWithRelationInput = {
      [sort]: order,
    };

    const [items, totalItems, totalFilters] = await Promise.all([
      tx.order.findMany({
        where,
        skip,
        take,
        orderBy,
        select: OrderQueryResponse,
      }),
      tx.order.count(),
      tx.order.count({ where }),
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
