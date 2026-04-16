import { prisma } from "../../libs/prisma.js";
import { ColourValidation } from "../../validations/colour.validation.js";
import Validation from "../../validations/validation.js";
import { ColourPatchResponse } from "../responses/colour.response.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import {
  ColourPatchResponseType,
  ColourPatchValidationType,
} from "../types/colour.type.js";

export const colourPatch = async (
  id: string,
  data: ColourPatchValidationType,
): Promise<ColourPatchResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedData = Validation.validate(ColourValidation.PATCH, data);
    const colour = await tx.colour.findUnique({
      where: { id },
    });
    if (!colour)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("colour"));

    if (validatedData.name === colour.name) validatedData.name = undefined;
    if (validatedData.hexCode === colour.hexCode)
      validatedData.hexCode = undefined;

    return tx.colour.update({
      where: { id },
      data: validatedData,
      select: ColourPatchResponse,
    });
  });
};
