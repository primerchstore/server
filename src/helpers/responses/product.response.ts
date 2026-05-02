import { Prisma } from "../../generated/prisma/client.js";

export const ProductQueryResponse = {
  id: true,
  name: true,
  basePrice: true,
  gender: true,
  slug: true,
  description: true,
  createdAt: true,
  updatedAt: true,
  sold: true,
  isActive: true,
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
} as const satisfies Prisma.ProductSelect;

export const ProductGetResponse = {
  id: true,
  name: true,
  basePrice: true,
  gender: true,
  slug: true,
  description: true,
  sold: true,
  isActive: true,
  variants: {
    select: {
      size: {
        select: {
          id: true,
          name: true,
        },
      },
      colour: {
        select: {
          hexCode: true,
          id: true,
          name: true,
        },
      },
    },
  },
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
} as const satisfies Prisma.ProductSelect;

export const ProductPostResponse = {
  id: true,
} as const satisfies Prisma.ProductSelect;

export const ProductPatchResponse = {
  id: true,
} as const satisfies Prisma.ProductSelect;

export const ProductDeleteResponse = {
  id: true,
} as const satisfies Prisma.ProductSelect;

export const ProductUtilGetTotalStockResponse = {
  id: true,
  name: true,
} as const satisfies Prisma.ProductSelect;
