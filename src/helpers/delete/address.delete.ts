import { prisma } from "../../libs/prisma.js";
import { AddressDeleteResponse } from "../responses/address.response.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import { AddressDeleteResponseType } from "../types/address.type.js";

export const addressDelete = async (
  id: string,
  userId: string,
): Promise<AddressDeleteResponseType> => {
  return prisma.$transaction(async (tx) => {
    const address = await tx.address.findUnique({ where: { id } });
    if (!address)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("address"));

    if (address.userId !== userId)
      throw new ResponseError(ErrorResponseMessage.FORBIDDEN());

    if (address.isDefault)
      throw new ResponseError(
        ErrorResponseMessage.BAD_REQUEST("cannot delete default address"),
      );
    return tx.address.delete({ where: { id }, select: AddressDeleteResponse });
  });
};
