import { z } from "zod";
import { order } from "../helpers/constants/order.constant.js";
import { Sort } from "../helpers/constants/sort.constant.js";

export class CategoryValidation {
  static QUERY = z.object({
    q: z.string().optional(),
    page: z.coerce.number().int().min(1).default(1),
    order: z.enum(order.items).default(order.default),
    take: z.coerce.number().int().min(1).default(10),
    sort: z.enum(Sort.CATEGORY.items).default(Sort.CATEGORY.default),
  });

  static GET = z.object({
    by: z.enum(["id", "slug"]),
    value: z.string(),
  });

  static POST = z.object({
    name: z.string().min(1).max(50),
    description: z
      .string()
      .min(3)
      .max(200)
      .optional()
      .nullable()
      .transform((val) => (val === "" ? undefined : val)),
    parentId: z.string().optional(),
    mediaId: z.string().optional(),
  });

  static PATCH = z.object({
    name: z
      .string()
      .min(1)
      .max(50)
      .optional()
      .transform((val) => (val === "" ? undefined : val)),
    description: z
      .string()
      .min(3)
      .max(200)
      .optional()
      .nullable()
      .transform((val) => (val === "" ? undefined : val)),
    parentId: z
      .string()
      .optional()
      .transform((val) => (val === "" ? undefined : val)),
    mediaId: z
      .string()
      .optional()
      .transform((val) => (val === "" ? undefined : val)),
  });
}
