import { prisma } from "../../libs/prisma.js";
import { ProductValidation } from "../../validations/product.validation.js";
import Validation from "../../validations/validation.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import { ProductGetResponse } from "../responses/product.response.js";
import {
  ProductGetResponseType,
  ProductGetValidationType,
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
