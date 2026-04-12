import { prisma } from "../../libs/prisma.js";
import { slugifySetting } from "../../libs/slugify.js";
import { CategoryValidation } from "../../validations/category.validation.js";
import Validation from "../../validations/validation.js";
import { CategoryPatchResponse } from "../responses/category.response.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import {
  CategoryPatchResponseType,
  CategoryPatchValidationType,
} from "../types/category.type.js";
import slugify from "slugify";

export const categoryPatch = async (
  id: string,
  data: CategoryPatchValidationType,
): Promise<CategoryPatchResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedData = Validation.validate(CategoryValidation.PATCH, data);
    const category = await tx.category.findUnique({
      where: { id },
    });

    if (!category)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("category"));

    if (validatedData.name === category.name) validatedData.name = undefined;
    if (validatedData.description === category.description)
      validatedData.description = undefined;
    if (validatedData.parentId === category.parentId)
      validatedData.parentId = undefined;

    let slug = category.slug;

    if (validatedData.name && validatedData.name !== category.name) {
      const tempSlug = slugify(validatedData.name, slugifySetting);
      const categoryExist = await tx.category.findUnique({
        where: { slug: tempSlug },
      });
      if (categoryExist)
        throw new ResponseError(
          ErrorResponseMessage.ALREADY_EXISTS("category"),
        );

      slug = tempSlug;
    }

    return tx.category.update({
      where: { id },
      data: { ...validatedData, slug },
      select: CategoryPatchResponse,
    });
  });
};
