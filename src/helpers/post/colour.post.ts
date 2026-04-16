import { prisma } from "../../libs/prisma.js";
import { ColourValidation } from "../../validations/colour.validation.js";
import Validation from "../../validations/validation.js";
import { ColourPostResponse } from "../responses/colour.response.js";
import {
  ColourPostResponseType,
  ColourPostValidationType,
} from "../types/colour.type.js";

export const colourPost = async (
  data: ColourPostValidationType,
): Promise<ColourPostResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedData = Validation.validate(ColourValidation.POST, data);
    return tx.colour.create({
      data: validatedData,
      select: ColourPostResponse,
    });
  });
};
