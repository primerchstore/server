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
    const { addedMedias, deletedMedias, ...validatedData } =
      Validation.validate(CategoryValidation.PATCH, data);
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

    if (addedMedias?.length && deletedMedias?.length) {
      const deletedSet = new Set(deletedMedias);
      const conflicts = addedMedias.filter((mId) => deletedSet.has(mId));
      if (conflicts.length) {
        throw new ResponseError(
          ErrorResponseMessage.BAD_REQUEST(
            "Media cannot be in both addedMedias and deletedMedias",
          ),
        );
      }
    }

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
          categoryId: id,
          mediaId: { in: addedMedias },
        },
        select: { mediaId: true },
      });
      if (alreadyLinked.length) {
        throw new ResponseError(ErrorResponseMessage.ALREADY_EXISTS("media"));
      }

      const aggregate = await tx.categoryMedia.aggregate({
        where: { categoryId: id },
        _max: { sortOrder: true },
      });
      const maxSortOrder = aggregate._max.sortOrder ?? 0;

      await tx.categoryMedia.createMany({
        data: addedMedias.map((mediaId, i) => ({
          categoryId: id,
          mediaId,
          sortOrder: maxSortOrder + i + 1,
        })),
      });
    }

    if (deletedMedias?.length) {
      const foundMedias = await tx.media.findMany({
        where: { id: { in: deletedMedias } },
        select: { id: true },
      });
      const foundIds = new Set(foundMedias.map((m) => m.id));
      const missingMedias = deletedMedias.filter((mId) => !foundIds.has(mId));
      if (missingMedias.length) {
        throw new ResponseError(ErrorResponseMessage.NOT_FOUND("media"));
      }

      const linkedMedias = await tx.categoryMedia.findMany({
        where: {
          categoryId: id,
          mediaId: { in: deletedMedias },
        },
        select: { mediaId: true },
      });
      const linkedIds = new Set(linkedMedias.map((m) => m.mediaId));
      const notLinked = deletedMedias.filter((mId) => !linkedIds.has(mId));
      if (notLinked.length) {
        throw new ResponseError(ErrorResponseMessage.NOT_FOUND("media"));
      }

      await tx.categoryMedia.deleteMany({
        where: {
          categoryId: id,
          mediaId: { in: deletedMedias },
        },
      });
    }

    return tx.category.update({
      where: { id },
      data: { ...validatedData, slug },
      select: CategoryPatchResponse,
    });
  });
};
