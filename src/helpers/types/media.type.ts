import { z } from "better-auth";
import { Prisma } from "../../generated/prisma/client.js";
import {
  MediaDeleteResponse,
  MediaPostReponse,
  MediaQueryResponse,
} from "../responses/media.response.js";
import { Pagination } from "./pagination.type.js";
import { MediaValidation } from "../../validations/media.validation.js";

export type MediaQueryValidationType = z.infer<typeof MediaValidation.QUERY>;
export type MediaDeleteValidationType = z.infer<typeof MediaValidation.DELETE>;

export type MediaPostResponseType = Prisma.MediaGetPayload<{
  select: typeof MediaPostReponse;
}>;

export type MediaQueryResponseType = {
  pagination: Pagination;
  query: Prisma.MediaGetPayload<{ select: typeof MediaQueryResponse }>[];
};

export type MediaDeleteResponseType = Prisma.MediaGetPayload<{
  select: typeof MediaDeleteResponse;
}>;
