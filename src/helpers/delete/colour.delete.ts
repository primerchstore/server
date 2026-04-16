import { prisma } from "../../libs/prisma.js";
import { ColourDeleteResponse } from "../responses/colour.response.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import { ColourDeleteResponseType } from "../types/colour.type.js";

export const colourDelete = async (
  id: string,
): Promise<ColourDeleteResponseType> => {
  return prisma.$transaction(async (tx) => {
    const colour = await tx.colour.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!colour)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("colour"));

    return tx.colour.delete({ where: { id }, select: ColourDeleteResponse });
  });
};
