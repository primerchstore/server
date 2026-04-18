import { Prisma } from "../../generated/prisma/client.js";

export const VariantQueryResponse = {
  id: true,
  createdAt: true,
  updatedAt: true,
  product: {
    select: {
      name: true,
      basePrice: true,
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      gender: true,
      description: true,
      sold: true,
    },
  },
  colour: {
    select: {
      id: true,
      hexCode: true,
    },
  },
  size: {
    select: {
      id: true,
      code: true,
    },
  },
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
  sku: true,
  stock: true,
  price: true,
  isActive: true,
} as const satisfies Prisma.VariantSelect;

export const VariantGetResponse = {
  id: true,
  createdAt: true,
  updatedAt: true,
  product: {
    select: {
      name: true,
      basePrice: true,
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      gender: true,
      description: true,
      sold: true,
    },
  },
  colour: {
    select: {
      id: true,
      hexCode: true,
      name: true,
    },
  },
  size: {
    select: {
      id: true,
      code: true,
      name: true,
    },
  },
  medias: {
    select: {
      media: {
        select: {
          id: true,
          url: true,
          publicId: true,
        },
      },
    },
  },
  sku: true,
  stock: true,
  price: true,
  isActive: true,
  reviews: {
    select: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      rating: true,
      content: true,
    },
  },
  _count: {
    select: {
      medias: true,
      orderItems: true,
      cartItems: true,
      reviews: true,
    },
  },
} as const satisfies Prisma.VariantSelect;

export const VariantPostResponse = {
  id: true,
} as const satisfies Prisma.VariantSelect;

export const VariantPatchResponse = {
  id: true,
} as const satisfies Prisma.VariantSelect;

export const VariantDeleteResponse = {
  id: true,
} as const satisfies Prisma.VariantSelect;
