import { z } from "zod";
import { ColourValidation } from "../../validations/colour.validation.js";
import { Pagination } from "./pagination.type.js";
import { Prisma } from "../../generated/prisma/client.js";
import {
  ColourDeleteResponse,
  ColourPatchResponse,
  ColourPostResponse,
  ColourQueryResponse,
} from "../responses/colour.response.js";

export type ColourQueryValidationType = z.infer<typeof ColourValidation.QUERY>;
export type ColourPostValidationType = z.infer<typeof ColourValidation.POST>;
export type ColourPatchValidationType = z.infer<typeof ColourValidation.PATCH>;

export type ColourQueryResponseType = {
  pagination: Pagination;
  query: Prisma.ColourGetPayload<{ select: typeof ColourQueryResponse }>[];
};

export type ColourPostResponseType = Prisma.ColourGetPayload<{
  select: typeof ColourPostResponse;
}>;

export type ColourPatchResponseType = Prisma.ColourGetPayload<{
  select: typeof ColourPatchResponse;
}>;

export type ColourDeleteResponseType = Prisma.ColourGetPayload<{
  select: typeof ColourDeleteResponse;
}>;
