import { prisma } from "../../libs/prisma.js";
import { slugifySetting } from "../../libs/slugify.js";
import { ProductValidation } from "../../validations/product.validation.js";
import Validation from "../../validations/validation.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import {
  ProductPostResponseType,
  ProductPostValidationType,
} from "../types/product.type.js";
import slugify from "slugify";

export const productPost = async (
  data: ProductPostValidationType,
): Promise<ProductPostResponseType> => {
  return prisma.$transaction(async (tx) => {
    const { addedMedias, ...validatedData } = Validation.validate(
      ProductValidation.POST,
      data,
    );

    if (validatedData.categoryId) {
      const category = await tx.category.findUnique({
        where: { id: validatedData.categoryId },
        select: { id: true },
      });
      if (!category)
        throw new ResponseError(ErrorResponseMessage.NOT_FOUND("category"));
    }

    const slug = slugify(validatedData.name, slugifySetting);

    const existProduct = await tx.product.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (existProduct)
      throw new ResponseError(ErrorResponseMessage.ALREADY_EXISTS("product"));

    const product = await tx.product.create({
      data: { slug, ...validatedData },
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

      const alreadyLinked = await tx.productMedia.findMany({
        where: {
          productId: product.id,
          mediaId: { in: addedMedias },
        },
        select: { mediaId: true },
      });
      if (alreadyLinked.length) {
        throw new ResponseError(ErrorResponseMessage.ALREADY_EXISTS("media"));
      }

      const aggregate = await tx.productMedia.aggregate({
        where: { productId: product.id },
        _max: { sortOrder: true },
      });
      const maxSortOrder = aggregate._max.sortOrder ?? 0;

      await tx.productMedia.createMany({
        data: addedMedias.map((mediaId, i) => ({
          productId: product.id,
          mediaId,
          sortOrder: maxSortOrder + i + 1,
        })),
      });
    }

    return product;
  });
};
