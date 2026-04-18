import { prisma } from "../../libs/prisma.js";
import { slugifySetting } from "../../libs/slugify.js";
import Validation from "../../validations/validation.js";
import { VariantValidation } from "../../validations/variant.validation.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import {
  VariantPostResponseType,
  VariantPostValidationType,
} from "../types/variant.type.js";
import slugify from "slugify";

export const variantPost = async (
  data: VariantPostValidationType,
): Promise<VariantPostResponseType> => {
  return prisma.$transaction(async (tx) => {
    const { addedMedias, ...validatedData } = Validation.validate(
      VariantValidation.POST,
      data,
    );

    let colourName: string | undefined = undefined;
    let sizeName: string | undefined = undefined;

    const product = await tx.product.findUnique({
      where: { id: validatedData.productId },
    });

    if (!product)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("product"));

    if (validatedData.colourId) {
      const colour = await tx.colour.findUnique({
        where: { id: validatedData.colourId },
        select: { name: true },
      });
      if (!colour)
        throw new ResponseError(ErrorResponseMessage.NOT_FOUND("colour"));
      colourName = colour.name;
    }

    if (validatedData.sizeId) {
      const size = await tx.size.findUnique({
        where: { id: validatedData.sizeId },
        select: { name: true },
      });
      if (!size)
        throw new ResponseError(ErrorResponseMessage.NOT_FOUND("size"));
      sizeName = size.name;
    }

    const sku = slugify(
      `${product.name} ${sizeName ?? "UNSIZE"} ${colourName ?? "UNCOLOUR"}`,
      slugifySetting,
    ).toUpperCase();

    const variantExist = await tx.variant.findUnique({
      where: { sku },
      select: { id: true },
    });

    if (variantExist)
      throw new ResponseError(ErrorResponseMessage.ALREADY_EXISTS("variant"));

    if (!validatedData.price) {
      validatedData.price = Number(product.basePrice);
    }

    const variant = await tx.variant.create({
      data: { ...validatedData, sku, price: validatedData.price },
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

      const alreadyLinked = await tx.variantMedia.findMany({
        where: {
          variantId: variant.id,
          mediaId: { in: addedMedias },
        },
        select: { mediaId: true },
      });
      if (alreadyLinked.length) {
        throw new ResponseError(ErrorResponseMessage.ALREADY_EXISTS("media"));
      }

      const aggregate = await tx.variantMedia.aggregate({
        where: { variantId: variant.id },
        _max: { sortOrder: true },
      });
      const maxSortOrder = aggregate._max.sortOrder ?? 0;

      await tx.variantMedia.createMany({
        data: addedMedias.map((mediaId, i) => ({
          variantId: variant.id,
          mediaId,
          sortOrder: maxSortOrder + i + 1,
        })),
      });
    }
    return variant;
  });
};
