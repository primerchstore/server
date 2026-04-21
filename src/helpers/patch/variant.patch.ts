import { prisma } from "../../libs/prisma.js";
import { slugifySetting } from "../../libs/slugify.js";
import Validation from "../../validations/validation.js";
import { VariantValidation } from "../../validations/variant.validation.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import { VariantPatchResponse } from "../responses/variant.response.js";
import {
  VariantPatchResponseType,
  VariantPatchValidationType,
} from "../types/variant.type.js";
import slugify from "slugify";

export const variantPatch = async (
  id: string,
  data: VariantPatchValidationType,
): Promise<VariantPatchResponseType> => {
  return prisma.$transaction(async (tx) => {
    const { addedMedias, deletedMedias, ...validatedData } =
      Validation.validate(VariantValidation.PATCH, data);

    const variant = await tx.variant.findUnique({
      where: { id },
      include: {
        product: { select: { name: true, id: true } },
        colour: { select: { name: true, id: true } },
        size: { select: { name: true, id: true } },
      },
    });
    if (!variant)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("variant"));

    let currentProductName: string | undefined | null = variant.product.name;
    let currentColourName: string | undefined | null = variant.colour?.name;
    let currentSizeName: string | undefined | null = variant.size?.name;

    if (validatedData.colourId && validatedData.colourId !== variant.colourId) {
      const colour = await tx.colour.findUnique({
        where: { id: validatedData.colourId },
      });
      if (!colour)
        throw new ResponseError(ErrorResponseMessage.NOT_FOUND("colour"));
      currentColourName = colour.name;
    }
    if (validatedData.sizeId && validatedData.sizeId !== variant.sizeId) {
      const size = await tx.size.findUnique({
        where: { id: validatedData.sizeId },
      });
      if (!size)
        throw new ResponseError(ErrorResponseMessage.NOT_FOUND("size"));
      currentSizeName = size.name;
    }
    const newSku = slugify(
      `${currentProductName} ${currentSizeName ?? "UNSIZE"} ${currentColourName ?? "UNCOLOUR"}`,
      slugifySetting,
    ).toUpperCase();

    if (variant.sku === newSku) return { id: variant.id };

    const variantExist = await tx.variant.findUnique({
      where: { sku: newSku },
      select: { id: true, sku: true },
    });

    if (variantExist)
      throw new ResponseError(ErrorResponseMessage.ALREADY_EXISTS("variant"));

    if (validatedData.price === Number(variant.price))
      validatedData.price = undefined;
    if (validatedData.isActive === variant.isActive)
      validatedData.isActive = undefined;
    if (validatedData.stock === variant.stock) validatedData.stock = undefined;

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
          variantId: id,
          mediaId: { in: addedMedias },
        },
        select: { mediaId: true },
      });
      if (alreadyLinked.length) {
        throw new ResponseError(ErrorResponseMessage.ALREADY_EXISTS("media"));
      }

      const aggregate = await tx.variantMedia.aggregate({
        where: { variantId: id },
        _max: { sortOrder: true },
      });
      const maxSortOrder = aggregate._max.sortOrder ?? 0;

      await tx.variantMedia.createMany({
        data: addedMedias.map((mediaId, i) => ({
          variantId: id,
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

      const linkedMedias = await tx.variantMedia.findMany({
        where: {
          variantId: id,
          mediaId: { in: deletedMedias },
        },
        select: { mediaId: true },
      });
      const linkedIds = new Set(linkedMedias.map((m) => m.mediaId));
      const notLinked = deletedMedias.filter((mId) => !linkedIds.has(mId));
      if (notLinked.length) {
        throw new ResponseError(ErrorResponseMessage.NOT_FOUND("media"));
      }

      await tx.variantMedia.deleteMany({
        where: {
          variantId: id,
          mediaId: { in: deletedMedias },
        },
      });
    }

    return tx.variant.update({
      where: { id },
      data: { sku: newSku, ...validatedData },
      select: VariantPatchResponse,
    });
  });
};
