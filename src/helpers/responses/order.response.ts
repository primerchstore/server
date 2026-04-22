import { Prisma } from "../../generated/prisma/client.js";

export const OrderQueryResponse = {
  id: true,
  user: {
    select: {
      id: true,
      name: true,
      image: true,
      email: true,
    },
  },
  createdAt: true,
  paymentMethod: true,
  status: true,
  _count: {
    select: {
      items: true,
    },
  },
} as const satisfies Prisma.OrderSelect;

export const OrderGetResponse = {
  id: true,
  createdAt: true,
  updatedAt: true,
  paymentMethod: true,
  status: true,
  user: {
    select: {
      id: true,
      name: true,
      image: true,
      email: true,
    },
  },
  items: {
    select: {
      variant: {
        select: {
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
          product: {
            select: {
              id: true,
              name: true,
              basePrice: true,
              gender: true,
              slug: true,
              category: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
              tags: {
                select: {
                  tag: {
                    select: {
                      id: true,
                      name: true,
                      slug: true,
                    },
                  },
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
            },
          },
        },
      },
    },
  },
  _count: {
    select: {
      items: true,
    },
  },
} as const satisfies Prisma.OrderSelect;

export type OrderPreviewResponseType = {
  items: {
    variantId: string;
    name: string;
    size: string | null;
    colour: string | null;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }[];
  promoCode: {
    code: string;
    type: string;
    value: number;
  } | null;
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  total: number;
};

export const OrderPostResponse = {
  id: true,
} as const satisfies Prisma.OrderSelect;

export const OrderUpdateStatusResponse = {
  id: true,
} as const satisfies Prisma.OrderSelect;
