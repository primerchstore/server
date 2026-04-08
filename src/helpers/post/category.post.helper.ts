import slugify from "slugify";
import { prisma } from "../../libs/prisma.js";
import { CategoryValidation } from "../../validations/category.validation.js";
import Validation from "../../validations/validation.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import {
  CategoryPostResponseType,
  CategoryPostValidationType,
} from "../types/category.type.js";
import { slugifySetting } from "../../libs/slugify.js";

export const categoryPost = async (
  data: CategoryPostValidationType,
): Promise<CategoryPostResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedData = Validation.validate(CategoryValidation.POST, data);

    if (validatedData.mediaId) {
      const media = await tx.media.findUnique({
        where: { id: validatedData.mediaId },
        select: { id: true },
      });
      if (!media)
        throw new ResponseError(ErrorResponseMessage.NOT_FOUND("media"));
    }

    if (validatedData.parentId) {
      const parent = await tx.category.findUnique({
        where: { id: validatedData.parentId },
        select: { id: true },
      });
      if (!parent)
        throw new ResponseError(ErrorResponseMessage.NOT_FOUND("category"));
    }

    const slug = slugify(validatedData.name, slugifySetting);

    const categoryExist = await tx.category.findFirst({
      where: { slug },
      select: { id: true },
    });

    if (categoryExist)
      throw new ResponseError(ErrorResponseMessage.ALREADY_EXISTS("category"));
    return tx.category.create({
      data: { ...validatedData, slug },
      select: { id: true },
    });
  });
};
