import { Prisma } from "../../generated/prisma/client.js";

export const CartVariantQueryResponse = {
  variant: {
    include: {
      medias: {
        select: {
          media: {
            select: {
              id: true,
              url: true,
            },
          },
        },
      },
    },
  },
  quantity: true,
  createdAt: true,
  updatedAt: true,
} as const satisfies Prisma.VariantCartSelect;

export const CartVariantAddVariantResponse = {
  variantId: true,
} as const satisfies Prisma.VariantCartSelect;

export const CartVariantUpdateQuantityVariantResponse = {
  variantId: true,
} as const satisfies Prisma.VariantCartSelect;

export const CartVariantDeleteVariantResponse = {
  variantId: true,
} as const satisfies Prisma.VariantCartSelect;
