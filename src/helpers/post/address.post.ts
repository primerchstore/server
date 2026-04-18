import { prisma } from "../../libs/prisma.js";
import { AddressValidation } from "../../validations/address.validation.js";
import Validation from "../../validations/validation.js";
import { AddressPostResponse } from "../responses/address.response.js";
import {
  AddressPostResponseType,
  AddressPostValidationType,
} from "../types/address.type.js";

export const addressPost = async (
  userId: string,
  data: AddressPostValidationType,
): Promise<AddressPostResponseType> => {
  return prisma.$transaction(async (tx) => {
    const validatedData = Validation.validate(AddressValidation.POST, data);
    const defaultExist = await tx.address.findMany({
      where: { isDefault: true },
      select: { id: true },
    });

    if (!defaultExist) {
      validatedData.isDefault = true;
    }

    if (validatedData.isDefault && defaultExist) {
      await tx.address.updateMany({
        where: { isDefault: true },
        data: { isDefault: false },
      });
    }

    return tx.address.create({
      data: { userId, ...validatedData },
      select: AddressPostResponse,
    });
  });
};
