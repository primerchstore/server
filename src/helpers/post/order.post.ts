import { prisma } from "../../libs/prisma.js";
import { OrderValidation } from "../../validations/order.validation.js";
import Validation from "../../validations/validation.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import { OrderPostResponse } from "../responses/order.response.js";
import {
  OrderPostResponseType,
  OrderPostValidationType,
} from "../types/order.type.js";

export const orderPost = async (
  data: OrderPostValidationType,
): Promise<OrderPostResponseType> => {
  return prisma.$transaction(async (tx) => {
    let subtotal = 0;
    let discountAmount = 0;
    let shippingCost = 5;
    let total = 0;

    const validatedData = Validation.validate(OrderValidation.POST, data);
    const { addressId, paymentMethod, promoCodeId, userId, notes } =
      validatedData;

    const user = await tx.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) throw new ResponseError(ErrorResponseMessage.NOT_FOUND("user"));

    const address = await tx.address.findUnique({
      where: {
        id: addressId,
      },
      select: {
        id: true,
        userId: true,
      },
    });

    if (!address)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("address"));
    if (address.userId !== userId)
      throw new ResponseError(ErrorResponseMessage.FORBIDDEN());

    const cart = await tx.cart.findUnique({
      where: { userId: user.id },
      select: {
        id: true,
        items: { select: { variantId: true } },
        _count: { select: { items: true } },
      },
    });

    if (!cart) throw new ResponseError(ErrorResponseMessage.NOT_FOUND("cart"));

    if (cart._count.items === 0)
      throw new ResponseError(
        ErrorResponseMessage.BAD_REQUEST("no items in cart"),
      );

    const cartItems = await tx.variantCart.findMany({
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
      const itemSubtotal = Number(item.variant.price) * item.quantity;
      subtotal += itemSubtotal;
    }

    let promoCode = null;
    if (promoCodeId) {
      promoCode = await tx.promoCode.findUnique({
        where: { id: promoCodeId },
      });

      if (!promoCode) {
        throw new ResponseError(ErrorResponseMessage.NOT_FOUND("promo"));
      }

      if (!promoCode.isActive) {
        throw new ResponseError(
          ErrorResponseMessage.BAD_REQUEST("promo is not active"),
        );
      }

      if (promoCode.expiresAt && promoCode.expiresAt < new Date()) {
        throw new ResponseError(
          ErrorResponseMessage.BAD_REQUEST("promo has expired"),
        );
      }

      if (promoCode.usageLimit && promoCode.usedCount >= promoCode.usageLimit) {
        throw new ResponseError(
          ErrorResponseMessage.BAD_REQUEST("promo usage limit reached"),
        );
      }

      if (Number(promoCode.minOrder) > subtotal) {
        throw new ResponseError(
          ErrorResponseMessage.BAD_REQUEST(
            `minimum order amount of ${promoCode.minOrder} required for this promo code`,
          ),
        );
      }

      if (promoCode.type === "PERCENTAGE") {
        discountAmount = (subtotal * Number(promoCode.value)) / 100;
      } else {
        discountAmount = Number(promoCode.value);
      }
    }

    total = subtotal - discountAmount + shippingCost;

    const order = await tx.order.create({
      data: {
        userId,
        addressId,
        promoCodeId: promoCodeId || null,
        paymentMethod,
        subtotal: subtotal,
        discountAmount: discountAmount,
        shippingCost: shippingCost,
        total: total,
        notes: notes || null,
        items: {
          create: cartItems.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
            unitPrice: item.variant.price,
            subtotal: Number(item.variant.price) * item.quantity,
          })),
        },
      },
      select: OrderPostResponse,
    });

    if (promoCode) {
      await tx.promoCode.update({
        where: { id: promoCodeId },
        data: { usedCount: { increment: 1 } },
      });
    }

    await tx.variantCart.deleteMany({
      where: { cartId: cart.id },
    });

    return order;
  });
};
