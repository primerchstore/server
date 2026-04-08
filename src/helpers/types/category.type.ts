import { z } from "zod";
import { CategoryValidation } from "../../validations/category.validation.js";
import { Prisma } from "../../generated/prisma/client.js";
import { CategoryPostResponse } from "../responses/category.response.js";

export type CategoryPostValidationType = z.infer<
  typeof CategoryValidation.POST
>;

export type CategoryPostResponseType = Prisma.CategoryGetPayload<{
  select: typeof CategoryPostResponse;
}>;
