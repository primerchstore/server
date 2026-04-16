import { z } from "zod";
import { Pagination } from "./pagination.type.js";
import { Prisma } from "../../generated/prisma/client.js";
import { SizeValidation } from "../../validations/size.validation.js";
import {
  SizeDeleteResponse,
  SizePatchResponse,
  SizePostResponse,
  SizeQueryResponse,
} from "../responses/size.response.js";

export type SizeQueryValidationType = z.infer<typeof SizeValidation.QUERY>;
export type SizePostValidationType = z.infer<typeof SizeValidation.POST>;
export type SizePatchValidationType = z.infer<typeof SizeValidation.PATCH>;

export type SizeQueryResponseType = {
  pagination: Pagination;
  query: Prisma.SizeGetPayload<{ select: typeof SizeQueryResponse }>[];
};

export type SizePostResponseType = Prisma.SizeGetPayload<{
  select: typeof SizePostResponse;
}>;

export type SizePatchResponseType = Prisma.SizeGetPayload<{
  select: typeof SizePatchResponse;
}>;

export type SizeDeleteResponseType = Prisma.SizeGetPayload<{
  select: typeof SizeDeleteResponse;
}>;
