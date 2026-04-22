import { z } from "zod";
import {
  OrderAdminValidation,
  OrderValidation,
} from "../../validations/order.validation.js";
import { Pagination } from "./pagination.type.js";
import { Prisma } from "../../generated/prisma/client.js";
import {
  OrderGetResponse,
  OrderPostResponse,
  OrderQueryResponse,
  OrderUpdateStatusResponse,
} from "../responses/order.response.js";

export type OrderQueryValidationType = z.infer<typeof OrderValidation.QUERY>;
export type OrderAdminQueryValidationType = z.infer<
  typeof OrderAdminValidation.QUERY
>;

export type OrderGetValidationType = z.infer<typeof OrderValidation.GET>;
export type OrderAdminGetValidationType = z.infer<
  typeof OrderAdminValidation.GET
>;

export type OrderPreviewValidationType = z.infer<
  typeof OrderValidation.PREVIEW
>;
export type OrderPostValidationType = z.infer<typeof OrderValidation.POST>;
export type OrderUpdateStatusValidationType = z.infer<
  typeof OrderAdminValidation.UPDATE_STATUS
>;

export type OrderQueryResponseType = {
  pagination: Pagination;
  query: Prisma.OrderGetPayload<{ select: typeof OrderQueryResponse }>[];
};

export type OrderGetResponseType = Prisma.OrderGetPayload<{
  select: typeof OrderGetResponse;
}>;

export type OrderPostResponseType = Prisma.OrderGetPayload<{
  select: typeof OrderPostResponse;
}>;

export type OrderUpdateStatusResponseType = Prisma.OrderGetPayload<{
  select: typeof OrderUpdateStatusResponse;
}>;
