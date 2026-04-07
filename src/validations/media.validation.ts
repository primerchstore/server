import { z } from "zod";
import { Sort } from "../helpers/constants/sort.constant.js";
import { order } from "../helpers/constants/order.constant.js";

export class MediaValidation {
  static QUERY = z.object({
    page: z.coerce.number().int().min(1).default(1),
    take: z.coerce.number().int().min(1).default(10),
    sort: z.enum(Sort.MEDIA.items).default(Sort.MEDIA.default),
    order: z.enum(order.items).default(order.default),
  });
}
