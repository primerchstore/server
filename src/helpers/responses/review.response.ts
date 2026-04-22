import { Prisma } from "../../generated/prisma/client.js";

export const ReviewPostResponse = {
  id: true,
} as const satisfies Prisma.ReviewSelect;
