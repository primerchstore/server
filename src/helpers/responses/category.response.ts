import { Prisma } from "../../generated/prisma/client.js";

export const CategoryQueryResponse = {
  id: true,
  name: true,
  slug: true,
  description: true,
  parent: {
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
    },
  },
  children: {
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
    },
  },
  _count: {
    select: {
      products: true,
    },
  },
} as const satisfies Prisma.CategorySelect;

export const CategoryGetResponse = {
  id: true,
  name: true,
  slug: true,
  description: true,
  parent: {
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
    },
  },
  children: {
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
    },
  },
  _count: {
    select: {
      products: true,
    },
  },
} as const satisfies Prisma.CategorySelect;

export const CategoryPostResponse = {
  id: true,
} as const satisfies Prisma.CategorySelect;

export const CategoryPatchResponse = {
  id: true,
} as const satisfies Prisma.CategorySelect;

export const CategoryDeleteResponse = {
  id: true,
} as const satisfies Prisma.CategorySelect;
