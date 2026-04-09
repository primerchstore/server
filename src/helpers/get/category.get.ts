import { prisma } from "../../libs/prisma.js";
import { CategoryValidation } from "../../validations/category.validation.js";
import Validation from "../../validations/validation.js";
import { CategoryGetResponse } from "../responses/category.response.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import {
  CategoryGetResponseType,
  CategoryGetValidationType,
} from "../types/category.type.js";

export const categoryGet = (
  data: CategoryGetValidationType,
): Promise<CategoryGetResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedData = Validation.validate(CategoryValidation.GET, data);
    const category = await tx.category.findUnique({
      where: {
        ...(validatedData.by === "id"
          ? {
              id: data.value,
            }
          : { slug: data.value }),
      },
      select: CategoryGetResponse,
    });

    if (!category)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("category"));

    return category;
  });
};
