import { z } from "zod";
import { WishlistValidation } from "../../validations/wishlist.validation.js";
import { Pagination } from "./pagination.type.js";
import { Prisma } from "../../generated/prisma/client.js";
import {
  WishlistDeleteResponse,
  WishlistPostResponse,
  WishlistQueryResponse,
} from "../responses/wishlist.response.js";

export type WishlistQueryValidationType = z.infer<
  typeof WishlistValidation.QUERY
>;
export type WishlistPostValidationType = z.infer<
  typeof WishlistValidation.POST
>;
export type WishlistDeleteValidationType = z.infer<
  typeof WishlistValidation.DELETE
>;

export type WishlistQueryResponseType = {
  pagination: Pagination;
  query: Prisma.WishlistGetPayload<{ select: typeof WishlistQueryResponse }>[];
};

export type WishlistPostResponseType = Prisma.WishlistGetPayload<{
  select: typeof WishlistPostResponse;
}>;

export type WishlistDeleteResponseType = Prisma.WishlistGetPayload<{
  select: typeof WishlistDeleteResponse;
}>;
