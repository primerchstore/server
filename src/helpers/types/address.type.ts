import { z } from "zod";
import { AddressValidation } from "../../validations/address.validation.js";
import { Pagination } from "./pagination.type.js";
import { Prisma } from "../../generated/prisma/client.js";
import {
  AddressDeleteResponse,
  AddressPatchResponse,
  AddressPostResponse,
  AddressQueryResponse,
} from "../responses/address.response.js";

export type AddressQueryValidationType = z.infer<
  typeof AddressValidation.QUERY
>;
export type AddressPostValidationType = z.infer<typeof AddressValidation.POST>;
export type AddressPatchValidationType = z.infer<
  typeof AddressValidation.PATCH
>;

export type AddressQueryResponseType = {
  pagination: Pagination;
  query: Prisma.AddressGetPayload<{ select: typeof AddressQueryResponse }>[];
};

export type AddressPostResponseType = Prisma.AddressGetPayload<{
  select: typeof AddressPostResponse;
}>;

export type AddressPatchResponseType = Prisma.AddressGetPayload<{
  select: typeof AddressPatchResponse;
}>;

export type AddressDeleteResponseType = Prisma.AddressGetPayload<{
  select: typeof AddressDeleteResponse;
}>;
