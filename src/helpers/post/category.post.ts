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
    const { addedMedias, ...validatedData } = Validation.validate(
      CategoryValidation.POST,
      data,
    );

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

    const category = await tx.category.create({
      data: { ...validatedData, slug },
      select: { id: true },
    });

    if (addedMedias?.length) {
      const foundMedias = await tx.media.findMany({
        where: { id: { in: addedMedias } },
        select: { id: true },
      });
      const foundIds = new Set(foundMedias.map((m) => m.id));
      const missingMedias = addedMedias.filter((mId) => !foundIds.has(mId));
      if (missingMedias.length) {
        throw new ResponseError(ErrorResponseMessage.NOT_FOUND("media"));
      }

      const alreadyLinked = await tx.categoryMedia.findMany({
        where: {
          categoryId: category.id,
          mediaId: { in: addedMedias },
        },
        select: { mediaId: true },
      });
      if (alreadyLinked.length) {
        throw new ResponseError(ErrorResponseMessage.ALREADY_EXISTS("media"));
      }

      const aggregate = await tx.categoryMedia.aggregate({
        where: { categoryId: category.id },
        _max: { sortOrder: true },
      });
      const maxSortOrder = aggregate._max.sortOrder ?? 0;

      await tx.categoryMedia.createMany({
        data: addedMedias.map((mediaId, i) => ({
          categoryId: category.id,
          mediaId,
          sortOrder: maxSortOrder + i + 1,
        })),
      });
    }

    return category;
  });
};
