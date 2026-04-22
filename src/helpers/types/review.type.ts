import { z } from "zod";
import { ReviewValidation } from "../../validations/review.validation.js";
import { Prisma } from "../../generated/prisma/client.js";
import { ReviewPostResponse } from "../responses/review.response.js";

export type ReviewPostValidationType = z.infer<typeof ReviewValidation.POST>;
export type ReviewPostResponseType = Prisma.ReviewGetPayload<{
  select: typeof ReviewPostResponse;
}>;
