import { Prisma } from "../../generated/prisma/client.js";

export const MediaQueryResponse = {
  id: true,
  url: true,
  publicId: true,
  _count: {
    select: {
      productMedias: true,
      variantMedias: true,
    },
  },
} as const satisfies Prisma.MediaSelect;

export const MediaPostReponse = {
  id: true,
  url: true,
} as const satisfies Prisma.MediaSelect;

export const MediaGetResponse = {
  id: true,
  url: true,
  publicId: true,
  _count: {
    select: {
      productMedias: true,
      variantMedias: true,
    },
  },
} as const satisfies Prisma.MediaSelect;

export const MediaDeleteResponse = {
  id: true,
} as const satisfies Prisma.MediaSelect;