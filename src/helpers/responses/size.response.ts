import { Prisma } from "../../generated/prisma/client.js";

export const SizeQueryResponse = {
  id: true,
  name: true,
  code: true,
  createdAt: true,
  updatedAt: true,
  _count: {
    select: {
      variants: true,
    },
  },
} as const satisfies Prisma.SizeSelect;

export const SizePostResponse = {
  id: true,
} as const satisfies Prisma.SizeSelect;

export const SizePatchResponse = {
  id: true,
} as const satisfies Prisma.SizeSelect;

export const SizeDeleteResponse = {
  id: true,
} as const satisfies Prisma.SizeSelect;
