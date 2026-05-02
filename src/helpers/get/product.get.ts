import { prisma } from "../../libs/prisma.js";
import {
  ProductUtilValidation,
  ProductValidation,
} from "../../validations/product.validation.js";
import Validation from "../../validations/validation.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import { ProductGetResponse } from "../responses/product.response.js";
import {
  ProductGetResponseType,
  ProductGetValidationType,
  ProductUtilGetTotalStockResponseType,
  ProductUtilGetTotalStockValidationType,
} from "../types/product.type.js";

export const productGet = (
  data: ProductGetValidationType,
): Promise<ProductGetResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedData = Validation.validate(ProductValidation.GET, data);
    const product = await tx.product.findUnique({
      where: {
        ...(validatedData.by === "id"
          ? {
              id: data.value,
            }
          : { slug: data.value }),
      },
      select: ProductGetResponse,
    });

    if (!product)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("product"));

    return product;
  });
};

export const productGetTotalStock = (
  data: ProductUtilGetTotalStockValidationType,
): Promise<ProductUtilGetTotalStockResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedData = Validation.validate(
      ProductUtilValidation.GET_TOTAL_STOCK,
      data,
    );
    const product = await tx.product.findUnique({
      where: { id: validatedData.productId },
      select: { id: true, name: true },
    });

    if (!product)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("product"));

    const variants = await tx.variant.findMany({
      where: { productId: product.id },
      select: { stock: true },
    });

    let stock = 0 as number;

    for (const variant of variants) {
      stock += variant.stock;
    }

    return { ...product, stock };
  });
};
