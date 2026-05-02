import { Prisma } from "../../generated/prisma/client.js";

export const ColourQueryResponse = {
  id: true,
  name: true,
  hexCode: true,
  createdAt: true,
  updatedAt: true,
  _count: {
    select: {
      variants: true,
    },
  },
} as const satisfies Prisma.ColourSelect;

export const ColourPostResponse = {
  id: true,
} as const satisfies Prisma.ColourSelect;

export const ColourPatchResponse = {
  id: true,
} as const satisfies Prisma.ColourSelect;

export const ColourDeleteResponse = {
  id: true,
} as const satisfies Prisma.ColourSelect;
