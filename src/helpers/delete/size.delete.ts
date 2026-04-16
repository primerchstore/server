import { prisma } from "../../libs/prisma.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import { SizeDeleteResponse } from "../responses/size.response.js";
import { SizeDeleteResponseType } from "../types/size.type.js";

export const sizeDelete = async (
  id: string,
): Promise<SizeDeleteResponseType> => {
  return prisma.$transaction(async (tx) => {
    const size = await tx.size.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!size) throw new ResponseError(ErrorResponseMessage.NOT_FOUND("size"));

    return tx.size.delete({ where: { id }, select: SizeDeleteResponse });
  });
};
