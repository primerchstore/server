import { z } from "zod";
import { order } from "../helpers/constants/order.constant.js";
import { Sort } from "../helpers/constants/sort.constant.js";
import { OrderStatus, PaymentMethod } from "../generated/prisma/client.js";

export class OrderValidation {
  static QUERY = z.object({
    userId: z.string(),
    q: z.string().optional(),
    page: z.coerce.number().int().min(1).default(1),
    order: z.enum(order.items).default(order.default),
    take: z.coerce.number().int().min(1).default(10),
    sort: z.enum(Sort.ORDER_USER.items).default(Sort.ORDER_USER.default),
  });
  static GET = z.object({
    by: z.enum(["id"]),
    value: z.string(),
    userId: z.string(),
  });
  static PREVIEW = z.object({
    userId: z.string(),
    promoCodeId: z.string().optional(),
  });
  static POST = z.object({
    userId: z.string(),
    addressId: z.string(),
    promoCodeId: z.string().optional(),
    paymentMethod: z.enum(PaymentMethod),
    notes: z.string().optional(),
  });
}

export class OrderAdminValidation {
  static QUERY = z.object({
    q: z.string().optional(),
    page: z.coerce.number().int().min(1).default(1),
    order: z.enum(order.items).default(order.default),
    take: z.coerce.number().int().min(1).default(10),
    sort: z.enum(Sort.ORDER_USER.items).default(Sort.ORDER_USER.default),
  });

  static GET = z.object({
    by: z.enum(["id"]),
    value: z.string(),
  });
  static UPDATE_STATUS = z.object({
    orderId: z.string(),
    status: z.enum(OrderStatus),
  });
}
