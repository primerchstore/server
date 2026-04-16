import { z } from "zod";
import { order } from "../helpers/constants/order.constant.js";
import { Sort } from "../helpers/constants/sort.constant.js";

export class ColourValidation {
  static QUERY = z.object({
    q: z.string().optional(),
    page: z.coerce.number().int().min(1).default(1),
    order: z.enum(order.items).default(order.default),
    take: z.coerce.number().int().min(1).default(10),
    sort: z.enum(Sort.COLOUR.items).default(Sort.COLOUR.default),
  });
  static POST = z.object({
    name: z.string().min(1).max(50),
    hexCode: z.string().min(1).max(30),
  });
  static PATCH = z.object({
    name: z.string().min(1).max(50).optional(),
    hexCode: z.string().min(1).max(30).optional(),
  });
}
