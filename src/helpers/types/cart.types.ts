import { z } from "zod";
import { CartValidation } from "../../validations/cart.validation.js";
import { Pagination } from "./pagination.type.js";
import { Prisma } from "../../generated/prisma/client.js";
import {
  CartVariantAddVariantResponse,
  CartVariantDeleteVariantResponse,
  CartVariantQueryResponse,
  CartVariantUpdateQuantityVariantResponse,
} from "../responses/cart.response.js";

export type CartVariantQueryValidationType = z.infer<
  typeof CartValidation.QUERY_VARIANT
>;

export type CartVariantAddVariantValidationType = z.infer<
  typeof CartValidation.ADD_VARIANT
>;

export type CartVariantUpdateQuantityValidationType = z.infer<
  typeof CartValidation.UPDATE_QUANTITY
>;

export type CartVariantDeleteValidationType = z.infer<
  typeof CartValidation.DELETE_VARIANT
>;

export type CartVariantQueryResponseType = {
  pagination: Pagination;
  query: Prisma.VariantCartGetPayload<{
    select: typeof CartVariantQueryResponse;
  }>[];
};

export type CartVariantAddVariantResponseType = Prisma.VariantCartGetPayload<{
  select: typeof CartVariantAddVariantResponse;
}>;

export type CartVariantUpdateQuantityResponseType =
  Prisma.VariantCartGetPayload<{
    select: typeof CartVariantUpdateQuantityVariantResponse;
  }>;

export type CartVariantDeleteVariantResponseType =
  Prisma.VariantCartGetPayload<{
    select: typeof CartVariantDeleteVariantResponse;
  }>;
