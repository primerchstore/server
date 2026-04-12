import { prisma } from "../../libs/prisma.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import { CategoryDeleteResponseType } from "../types/category.type.js";

export const categoryDelete = async (
  id: string,
): Promise<CategoryDeleteResponseType> => {
  return prisma.$transaction(async (tx) => {
    const category = await tx.category.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!category)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("category"));
    return tx.category.delete({ where: { id }, select: { id: true } });
  });
};
