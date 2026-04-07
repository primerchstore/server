import { z } from "better-auth";
import { Prisma } from "../../generated/prisma/client.js";
import {
  MediaPostReponse,
  MediaQueryResponse,
} from "../responses/media.response.js";
import { Pagination } from "./pagination.type.js";
import { MediaValidation } from "../../validations/media.validation.js";

export type MediaQueryValidationType = z.infer<typeof MediaValidation.QUERY>;

export type MediaPostResponseType = Prisma.MediaGetPayload<{
  select: typeof MediaPostReponse;
}>;

export type MediaQueryResponseType = {
  pagination: Pagination;
  query: Prisma.MediaGetPayload<{ select: typeof MediaQueryResponse }>[];
};
