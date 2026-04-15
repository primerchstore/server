import { z } from "zod";
import { ProductValidation } from "../../validations/product.validation.js";
import { Pagination } from "./pagination.type.js";
import { Prisma } from "../../generated/prisma/client.js";
import {
  ProductDeleteResponse,
  ProductGetResponse,
  ProductPatchResponse,
  ProductPostResponse,
  ProductQueryResponse,
} from "../responses/product.response.js";

export type ProductQueryValidationType = z.infer<
  typeof ProductValidation.QUERY
>;
export type ProductGetValidationType = z.infer<typeof ProductValidation.GET>;
export type ProductPostValidationType = z.infer<typeof ProductValidation.POST>;
export type ProductPatchValidationType = z.infer<
  typeof ProductValidation.PATCH
>;

export type ProductQueryResponseType = {
  pagination: Pagination;
  query: Prisma.ProductGetPayload<{ select: typeof ProductQueryResponse }>[];
};

export type ProductGetResponseType = Prisma.ProductGetPayload<{
  select: typeof ProductGetResponse;
}>;

export type ProductPostResponseType = Prisma.ProductGetPayload<{
  select: typeof ProductPostResponse;
}>;

export type ProductPatchResponseType = Prisma.ProductGetPayload<{
  select: typeof ProductPatchResponse;
}>;
export type ProductDeleteResponseType = Prisma.ProductGetPayload<{
  select: typeof ProductDeleteResponse;
}>;
