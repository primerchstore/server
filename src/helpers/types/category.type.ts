import { z } from "zod";
import { CategoryValidation } from "../../validations/category.validation.js";
import { Prisma } from "../../generated/prisma/client.js";
import {
  CategoryDeleteResponse,
  CategoryGetResponse,
  CategoryPatchResponse,
  CategoryPostResponse,
  CategoryQueryResponse,
} from "../responses/category.response.js";
import { Pagination } from "./pagination.type.js";

export type CategoryQueryValidationType = z.infer<
  typeof CategoryValidation.QUERY
>;
export type CategoryGetValidationType = z.infer<typeof CategoryValidation.GET>;

export type CategoryPostValidationType = z.infer<
  typeof CategoryValidation.POST
>;
export type CategoryPatchValidationType = z.infer<
  typeof CategoryValidation.PATCH
>;

export type CategoryGetResponseType = Prisma.CategoryGetPayload<{
  select: typeof CategoryGetResponse;
}>;
export type CategoryQueryResponseType = {
  pagination: Pagination;
  query: Prisma.CategoryGetPayload<{ select: typeof CategoryQueryResponse }>[];
};

export type CategoryPostResponseType = Prisma.CategoryGetPayload<{
  select: typeof CategoryPostResponse;
}>;

export type CategoryPatchResponseType = Prisma.CategoryGetPayload<{
  select: typeof CategoryPatchResponse;
}>;
export type CategoryDeleteResponseType = Prisma.CategoryGetPayload<{
  select: typeof CategoryDeleteResponse;
}>;
