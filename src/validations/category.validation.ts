import { z } from "zod";

export class CategoryValidation {
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
}
