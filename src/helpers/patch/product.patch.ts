import { prisma } from "../../libs/prisma.js";
import { slugifySetting } from "../../libs/slugify.js";
import { ProductValidation } from "../../validations/product.validation.js";
import Validation from "../../validations/validation.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import { ProductPatchResponse } from "../responses/product.response.js";
import {
  ProductPatchResponseType,
  ProductPatchValidationType,
} from "../types/product.type.js";
import slugify from "slugify";

export const productPatch = async (
  id: string,
  data: ProductPatchValidationType,
): Promise<ProductPatchResponseType> => {
  return prisma.$transaction(async (tx) => {
    const { addedMedias, deletedMedias, tags, ...validatedData } =
      Validation.validate(ProductValidation.PATCH, data);

    const product = await tx.product.findUnique({
      where: { id },
    });

    if (!product)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("product"));

    if (validatedData.name === product.name) validatedData.name = undefined;
    if (validatedData.description === product.description)
      validatedData.description = undefined;
    if (validatedData.basePrice === Number(product.basePrice))
      validatedData.basePrice = undefined;
    if (validatedData.categoryId === product.categoryId)
      validatedData.categoryId = undefined;
    if (validatedData.gender === product.gender)
      validatedData.gender = undefined;
    if (validatedData.isActive === product.isActive)
      validatedData.isActive = undefined;

    let slug = product.slug;

    if (validatedData.name && validatedData.name !== product.name) {
      const tempSlug = slugify(validatedData.name, slugifySetting);
      const productExist = await tx.product.findUnique({
        where: { slug: tempSlug },
      });
      if (productExist)
        throw new ResponseError(ErrorResponseMessage.ALREADY_EXISTS("product"));
      slug = tempSlug;
    }

    if (
      validatedData.categoryId &&
      validatedData.categoryId !== product.categoryId
    ) {
      const categoryExist = await tx.category.findUnique({
        where: { id: validatedData.categoryId },
        select: { id: true },
      });
      if (!categoryExist)
        throw new ResponseError(ErrorResponseMessage.NOT_FOUND("category"));
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

      const alreadyLinked = await tx.productMedia.findMany({
        where: {
          productId: id,
          mediaId: { in: addedMedias },
        },
        select: { mediaId: true },
      });
      if (alreadyLinked.length) {
        throw new ResponseError(ErrorResponseMessage.ALREADY_EXISTS("media"));
      }

      const aggregate = await tx.productMedia.aggregate({
        where: { productId: id },
        _max: { sortOrder: true },
      });
      const maxSortOrder = aggregate._max.sortOrder ?? 0;

      await tx.productMedia.createMany({
        data: addedMedias.map((mediaId, i) => ({
          productId: id,
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

      const linkedMedias = await tx.productMedia.findMany({
        where: {
          productId: id,
          mediaId: { in: deletedMedias },
        },
        select: { mediaId: true },
      });
      const linkedIds = new Set(linkedMedias.map((m) => m.mediaId));
      const notLinked = deletedMedias.filter((mId) => !linkedIds.has(mId));
      if (notLinked.length) {
        throw new ResponseError(ErrorResponseMessage.NOT_FOUND("media"));
      }

      await tx.productMedia.deleteMany({
        where: {
          productId: id,
          mediaId: { in: deletedMedias },
        },
      });
    }

    return tx.product.update({
      where: { id },
      data: {
        ...validatedData,
        slug,
        tags: {
          deleteMany: {},
          create: tags?.map((tagName) => {
            const slug = slugify(tagName, slugifySetting);
            return {
              tag: {
                connectOrCreate: {
                  where: { slug },
                  create: {
                    name: tagName,
                    slug,
                  },
                },
              },
            };
          }),
        },
      },
      select: ProductPatchResponse,
    });
  });
};
