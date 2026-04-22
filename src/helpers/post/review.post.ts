import { prisma } from "../../libs/prisma.js";
import { ReviewValidation } from "../../validations/review.validation.js";
import Validation from "../../validations/validation.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import { ReviewPostResponse } from "../responses/review.response.js";
import {
  ReviewPostResponseType,
  ReviewPostValidationType,
} from "../types/review.type.js";

export const reviewPost = (
  data: ReviewPostValidationType,
): Promise<ReviewPostResponseType> => {
  return prisma.$transaction(async (tx) => {
    const { orderId, ...validatedData } = Validation.validate(
      ReviewValidation.POST,
      data,
    );
    const order = await tx.order.findUnique({
      where: { id: orderId },
      select: { id: true, userId: true, status: true },
    });
    if (!order)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("order"));

    if (order.userId !== validatedData.userId)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("order"));

    if (order.status !== "DELIVERED")
      throw new ResponseError(
        ErrorResponseMessage.BAD_REQUEST("not delivered yet"),
      );

    const product = await tx.product.findUnique({
      where: { id: validatedData.productId },
      select: { id: true },
    });
    if (!product)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("product"));

    const variant = await tx.variant.findUnique({
      where: { id: validatedData.variantId },
      select: { id: true },
    });

    if (!variant)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("variant"));

    const orderVariant = await tx.orderVariant.findUnique({
      where: {
        orderId_variantId: {
          orderId: order.id,
          variantId: variant.id,
        },
      },
    });
    if (!orderVariant)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("variant"));

    const reviewExist = await tx.review.findFirst({
      where: {
        userId: validatedData.userId,
        productId: product.id,
        variantId: variant.id,
      },
      select: { id: true },
    });

    if (reviewExist)
      throw new ResponseError(ErrorResponseMessage.ALREADY_EXISTS("review"));

    return tx.review.create({
      data: validatedData,
      select: ReviewPostResponse,
    });
  });
};
