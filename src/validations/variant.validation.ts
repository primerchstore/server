import { z } from "zod";
import { order } from "../helpers/constants/order.constant.js";
import { Sort } from "../helpers/constants/sort.constant.js";

export class VariantValidation {
  static QUERY = z.object({
    q: z.string().optional(),
    size: z.string().optional(),
    colour: z.string().optional(),
    sku: z.string().optional(),
    productId: z.string().optional(),
    page: z.coerce.number().int().min(1).default(1),
    order: z.enum(order.items).default(order.default),
    take: z.coerce.number().int().min(1).default(10),
    sort: z.enum(Sort.VARIANT.items).default(Sort.VARIANT.default),
  });
  static GET = z.object({
    by: z.enum(["id"]),
    value: z.string(),
  });
  static POST = z.object({
    productId: z.string(),
    sizeId: z.string().optional(),
    colourId: z.string().optional(),
    price: z.number().nonnegative().optional(),
    stock: z.number().nonnegative().default(0),
    isActive: z.boolean().default(true),
    addedMedias: z.array(z.string()).optional(),
  });
  static PATCH = z.object({
    sizeId: z.string().optional(),
    colourId: z.string().optional(),
    price: z.number().nonnegative().optional(),
    stock: z.number().nonnegative().default(0).optional(),
    isActive: z.boolean().default(true).optional(),
    addedMedias: z.array(z.string()).optional(),
    deletedMedias: z.array(z.string()).optional(),
  });
}
