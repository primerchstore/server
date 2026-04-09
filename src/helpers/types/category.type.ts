import { z } from "zod";
import { CategoryValidation } from "../../validations/category.validation.js";
import { Prisma } from "../../generated/prisma/client.js";
import {
  CategoryPostResponse,
  CategoryQueryResponse,
} from "../responses/category.response.js";
import { Pagination } from "./pagination.type.js";

export type CategoryQueryValidationType = z.infer<
  typeof CategoryValidation.QUERY
>;

export type CategoryPostValidationType = z.infer<
  typeof CategoryValidation.POST
>;

export type CategoryQueryResponseType = {
  pagination: Pagination;
  query: Prisma.CategoryGetPayload<{ select: typeof CategoryQueryResponse }>[];
};

export type CategoryPostResponseType = Prisma.CategoryGetPayload<{
  select: typeof CategoryPostResponse;
}>;
