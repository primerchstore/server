import { Prisma } from "../../generated/prisma/client.js";

export const AddressQueryResponse = {
  id: true,
  recipient: true,
  city: true,
  phone: true,
  province: true,
  street: true,
  isDefault: true,
  createdAt: true,
  updatedAt: true,
  _count: {
    select: {
      orders: true,
    },
  },
} as const satisfies Prisma.AddressSelect;

export const AddressPostResponse = {
  id: true,
} as const satisfies Prisma.AddressSelect;

export const AddressPatchResponse = {
  id: true,
} as const satisfies Prisma.AddressSelect;

export const AddressDeleteResponse = {
  id: true,
} as const satisfies Prisma.AddressSelect;
