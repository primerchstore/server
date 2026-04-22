import { prisma } from "../../libs/prisma.js";
import { OrderAdminValidation } from "../../validations/order.validation.js";
import Validation from "../../validations/validation.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import { OrderUpdateStatusResponse } from "../responses/order.response.js";
import {
  OrderUpdateStatusResponseType,
  OrderUpdateStatusValidationType,
} from "../types/order.type.js";

export const orderAdminUpdateStatus = async (
  data: OrderUpdateStatusValidationType,
): Promise<OrderUpdateStatusResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedData = Validation.validate(
      OrderAdminValidation.UPDATE_STATUS,
      data,
    );

    const order = await tx.order.findUnique({
      where: { id: validatedData.orderId },
      select: { id: true },
    });
    if (!order)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("order"));
    return tx.order.update({
      where: { id: validatedData.orderId },
      data: { status: validatedData.status },
      select: OrderUpdateStatusResponse,
    });
  });
};
