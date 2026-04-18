import { prisma } from "../../libs/prisma.js";
import { AddressValidation } from "../../validations/address.validation.js";
import Validation from "../../validations/validation.js";
import { AddressPatchResponse } from "../responses/address.response.js";
import {
  ErrorResponseMessage,
  ResponseError,
} from "../responses/error.response.js";
import {
  AddressPatchResponseType,
  AddressPatchValidationType,
} from "../types/address.type.js";

export const addressPatch = async (
  id: string,
  userId: string,
  data: AddressPatchValidationType,
): Promise<AddressPatchResponseType> => {
  return prisma.$transaction(async (tx) => {
    const address = await tx.address.findUnique({ where: { id } });
    if (!address)
      throw new ResponseError(ErrorResponseMessage.NOT_FOUND("address"));
    if (address?.userId !== userId)
      throw new ResponseError(ErrorResponseMessage.FORBIDDEN());

    const validatedData = Validation.validate(AddressValidation.PATCH, data);

    const defaultExist = await tx.address.findFirst({
      where: { isDefault: true },
    });

    if (address.isDefault && !defaultExist && !validatedData.isDefault)
      throw new ResponseError(
        ErrorResponseMessage.BAD_REQUEST("at least one default address"),
      );

    if (validatedData.isDefault) {
      await tx.address.updateMany({
        where: { isDefault: true },
        data: { isDefault: false },
      });
    }

    if (validatedData.recipient === address.recipient)
      validatedData.recipient = undefined;
    if (validatedData.city === address.city) validatedData.city = undefined;
    if (validatedData.street === address.street)
      validatedData.street = undefined;
    if (validatedData.phone === address.phone) validatedData.phone = undefined;
    if (validatedData.postalCode === address.postalCode)
      validatedData.postalCode = undefined;
    if (validatedData.province === address.province)
      validatedData.province = undefined;

    return tx.address.update({
      where: { id },
      data: validatedData,
      select: AddressPatchResponse,
    });
  });
};
