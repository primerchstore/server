import { z } from "zod";
import { VariantValidation } from "../../validations/variant.validation.js";
import { Pagination } from "./pagination.type.js";
import { Prisma } from "../../generated/prisma/client.js";
import {
  VariantDeleteResponse,
  VariantGetResponse,
  VariantPatchResponse,
  VariantPostResponse,
  VariantQueryResponse,
} from "../responses/variant.response.js";

export type VariantQueryValidationType = z.infer<
  typeof VariantValidation.QUERY
>;
export type VariantGetValidationType = z.infer<typeof VariantValidation.GET>;
export type VariantPostValidationType = z.infer<typeof VariantValidation.POST>;
export type VariantPatchValidationType = z.infer<
  typeof VariantValidation.PATCH
>;

export type VariantQueryResponseType = {
  pagination: Pagination;
  query: Prisma.VariantGetPayload<{ select: typeof VariantQueryResponse }>[];
};

export type VariantGetResponseType = Prisma.VariantGetPayload<{
  select: typeof VariantGetResponse;
}>;

export type VariantPostResponseType = Prisma.VariantGetPayload<{
  select: typeof VariantPostResponse;
}>;

export type VariantPatchResponseType = Prisma.VariantGetPayload<{
  select: typeof VariantPatchResponse;
}>;

export type VariantDeleteResponseType = Prisma.VariantGetPayload<{
  select: typeof VariantDeleteResponse;
}>;
