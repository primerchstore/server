import { z } from "zod";
import { order } from "../helpers/constants/order.constant.js";
import { Sort } from "../helpers/constants/sort.constant.js";

export class AddressValidation {
  static QUERY = z.object({
    q: z.string().optional(),
    page: z.coerce.number().int().min(1).default(1),
    order: z.enum(order.items).default(order.default),
    take: z.coerce.number().int().min(1).default(10),
    sort: z.enum(Sort.ADDRESS.items).default(Sort.ADDRESS.default),
  });
  static POST = z.object({
    recipient: z.string().min(2).max(100),
    phone: z.string().min(1).max(100),
    street: z.string().min(1).max(200),
    city: z.string().min(1).max(100),
    province: z.string().min(1).max(100),
    postalCode: z.string().min(1).max(10),
    isDefault: z.boolean().default(false),
  });
  static PATCH = z.object({
    recipient: z.string().min(2).max(100).optional(),
    phone: z.string().min(1).max(100).optional(),
    street: z.string().min(1).max(200).optional(),
    city: z.string().min(1).max(100).optional(),
    province: z.string().min(1).max(100).optional(),
    postalCode: z.string().min(1).max(10).optional(),
    isDefault: z.boolean().default(false).optional(),
  });
}
