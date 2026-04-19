import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { admin } from "better-auth/plugins";
import { createAuthMiddleware } from "better-auth/api";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    admin({
      defaultRole: "USER",
      adminRoles: ["ADMIN"],
    }),
  ],

  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/sign-up")) {
        const newSession = ctx.context.newSession;
        if (newSession) {
          const cart = await prisma.cart.findUnique({
            where: { userId: newSession.user.id },
          });
          if (!cart) {
            await prisma.cart.create({
              data: { userId: newSession.user.id },
            });
          }
        }
      }
    }),
  },
});
