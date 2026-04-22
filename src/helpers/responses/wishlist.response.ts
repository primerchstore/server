import { Prisma } from "../../generated/prisma/client.js";

export const WishlistQueryResponse = {
  id: true,
  product: {
    select: {
      id: true,
      name: true,
      basePrice: true,
      gender: true,
      slug: true,
      description: true,
      tags: {
        select: {
          id: true,
          tag: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      category: {
        select: {
          name: true,
          id: true,
        },
      },
      medias: {
        select: {
          id: true,
          media: {
            select: {
              id: true,
              url: true,
            },
          },
        },
      },
      _count: {
        select: {
          productViews: true,
          reviews: true,
          variants: true,
          wishlists: true,
        },
      },
    },
  },
} as const satisfies Prisma.WishlistSelect;

export const WishlistPostResponse = {
  id: true,
} as const satisfies Prisma.WishlistSelect;

export const WishlistDeleteResponse = {
  id: true,
} as const satisfies Prisma.WishlistSelect;
