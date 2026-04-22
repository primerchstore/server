import { z } from "zod";

export class ReviewValidation {
  static POST = z.object({
    productId: z.string(),
    variantId: z.string(),
    orderId: z.string(),
    rating: z.number().min(1).max(5),
    content: z.string().optional(),
    userId: z.string(),
  });

  static DELETE = z.object({
    reviewId: z.string(),
    userId: z.string(),
  });
}
