import { z } from "zod";
import { order } from "../helpers/constants/order.constant.js";
import { Sort } from "../helpers/constants/sort.constant.js";
import { Gender } from "../generated/prisma/client.js";

export class ProductValidation {
  static QUERY = z.object({
    q: z.string().optional(),
    category: z.string().optional(),
    tags: z.preprocess(
      (val) =>
        val === undefined ? undefined : Array.isArray(val) ? val : [val],
      z.array(z.string().min(1)).optional(),
    ),
    page: z.coerce.number().int().min(1).default(1),
    order: z.enum(order.items).default(order.default),
    take: z.coerce.number().int().min(1).default(10),
    sort: z.enum(Sort.PRODUCT.items).default(Sort.PRODUCT.default),
  });
  static GET = z.object({
    by: z.enum(["id", "slug"]),
    value: z.string(),
  });
  static POST = z.object({
    name: z.string().min(1).max(100),
    description: z
      .string()
      .min(3)
      .max(200)
      .optional()
      .nullable()
      .transform((val) => (val === "" ? undefined : val)),
    basePrice: z.number().nonnegative(),
    categoryId: z.string().optional(),
    gender: z.enum(Gender).optional(),
    isActive: z.boolean().default(true),
    tags: z.array(z.string()).optional(),
    addedMedias: z.array(z.string()).optional(),
  });
  static PATCH = z.object({
    name: z.string().min(1).max(100).optional(),
    description: z
      .string()
      .min(3)
      .max(200)
      .optional()
      .nullable()
      .transform((val) => (val === "" ? undefined : val)),
    basePrice: z.number().nonnegative().optional(),
    gender: z.enum(Gender).optional(),
    categoryId: z.string().optional(),
    isActive: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    addedMedias: z.array(z.string()).optional(),
    deletedMedias: z.array(z.string()).optional(),
  });
}

export class ProductUtilValidation {
  static GET_TOTAL_STOCK = z.object({
    productId: z.string(),
  });
}
