import { z } from "zod";
import { order } from "../helpers/constants/order.constant.js";
import { Sort } from "../helpers/constants/sort.constant.js";

export class CartValidation {
  static QUERY_VARIANT = z.object({
    userId: z.string(),
    page: z.coerce.number().int().min(1).default(1),
    order: z.enum(order.items).default(order.default),
    take: z.coerce.number().int().min(1).default(10),
    sort: z
      .enum(Sort.VARIANT_IN_CART.items)
      .default(Sort.VARIANT_IN_CART.default),
  });
  static ADD_VARIANT = z.object({
    variantId: z.string(),
    userId: z.string(),
  });
  static UPDATE_QUANTITY = z.object({
    variantId: z.string(),
    userId: z.string(),
    quantity: z.number().nonnegative().min(1),
  });
  static DELETE_VARIANT = z.object({
    variantId: z.string(),
    userId: z.string(),
  });
}
