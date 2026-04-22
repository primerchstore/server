import { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../libs/prisma.js";
import {
  OrderAdminValidation,
  OrderValidation,
} from "../../validations/order.validation.js";
import Validation from "../../validations/validation.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import {
  OrderGetResponse,
  OrderPreviewResponseType,
} from "../responses/order.response.js";
import {
  OrderAdminGetValidationType,
  OrderGetResponseType,
  OrderGetValidationType,
  OrderPreviewValidationType,
} from "../types/order.type.js";

export const orderGet = async (
  data: OrderGetValidationType,
): Promise<OrderGetResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedData = Validation.validate(OrderValidation.GET, data);

    const order = await tx.order.findUnique({
      where: {
        [validatedData.by]: validatedData.value,
      },
      select: OrderGetResponse,
    });

    if (!order)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("order"));

    if (order.user.id !== validatedData.userId)
      throw new ResponseError(ErrorResponseMessage.FORBIDDEN());

    return order;
  });
};

export const orderPreview = async (
  data: OrderPreviewValidationType,
): Promise<OrderPreviewResponseType> => {
  let subtotal = 0;
  let discountAmount = 0;
  let shippingCost = 5;

  const validatedData = Validation.validate(OrderValidation.PREVIEW, data);
  const { userId, promoCodeId } = validatedData;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });
  if (!user) throw new ResponseError(ErrorResponseMessage.NOT_FOUND("user"));

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    select: {
      id: true,
      _count: { select: { items: true } },
    },
  });
  if (!cart) throw new ResponseError(ErrorResponseMessage.NOT_FOUND("cart"));
  if (cart._count.items === 0)
    throw new ResponseError(
      ErrorResponseMessage.BAD_REQUEST("no items in cart"),
    );

  const cartItems = await prisma.variantCart.findMany({
    where: { cartId: cart.id },
    include: {
      variant: {
        select: {
          id: true,
          price: true,
          stock: true,
          product: { select: { name: true } },
          size: { select: { name: true } },
          colour: { select: { name: true } },
        },
      },
    },
  });

  for (const item of cartItems) {
    if (item.variant.stock < item.quantity) {
      throw new ResponseError(
        ErrorResponseMessage.BAD_REQUEST(
          `Insufficient stock for variant ${item.variant.product.name} - ${item.variant.size?.name || ""} ${item.variant.colour?.name || ""}. Available: ${item.variant.stock}, requested: ${item.quantity}`,
        ),
      );
    }
  }

  for (const item of cartItems) {
    subtotal += Number(item.variant.price) * item.quantity;
  }

  let promoCode = null;
  if (promoCodeId) {
    promoCode = await prisma.promoCode.findUnique({
      where: { id: promoCodeId },
    });

    if (!promoCode)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("promo"));
    if (!promoCode.isActive)
      throw new ResponseError(
        ErrorResponseMessage.BAD_REQUEST("promo is not active"),
      );
    if (promoCode.expiresAt && promoCode.expiresAt < new Date())
      throw new ResponseError(
        ErrorResponseMessage.BAD_REQUEST("promo has expired"),
      );
    if (promoCode.usageLimit && promoCode.usedCount >= promoCode.usageLimit)
      throw new ResponseError(
        ErrorResponseMessage.BAD_REQUEST("promo usage limit reached"),
      );
    if (Number(promoCode.minOrder) > subtotal)
      throw new ResponseError(
        ErrorResponseMessage.BAD_REQUEST(
          `minimum order amount of ${promoCode.minOrder} required for this promo code`,
        ),
      );

    discountAmount =
      promoCode.type === "PERCENTAGE"
        ? (subtotal * Number(promoCode.value)) / 100
        : Number(promoCode.value);
  }

  return {
    items: cartItems.map((item) => ({
      variantId: item.variantId,
      name: item.variant.product.name,
      size: item.variant.size?.name ?? null,
      colour: item.variant.colour?.name ?? null,
      quantity: item.quantity,
      unitPrice: Number(item.variant.price),
      subtotal: Number(item.variant.price) * item.quantity,
    })),
    promoCode: promoCode
      ? {
          code: promoCode.code,
          type: promoCode.type,
          value: Number(promoCode.value),
        }
      : null,
    subtotal,
    discountAmount,
    shippingCost,
    total: subtotal - discountAmount + shippingCost,
  };
};

export const orderAdminGet = async (
  data: OrderAdminGetValidationType,
): Promise<OrderGetResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedData = Validation.validate(OrderAdminValidation.GET, data);

    const order = await tx.order.findUnique({
      where: {
        [validatedData.by]: validatedData.value,
      },
      select: OrderGetResponse,
    });

    if (!order)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("order"));

    return order;
  });
};
