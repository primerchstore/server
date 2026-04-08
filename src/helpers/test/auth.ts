import request from "supertest";
import app from "../../app.js";
import { prisma } from "../../libs/prisma.js";
import { UserRole } from "../../generated/prisma/client.js";
import "dotenv/config";

let credentials = {
  email: "test@gmail.com",
  name: "test",
  password: "testPassword",
};

export const signIn = async ({
  email = credentials.email,
  name = credentials.name,
  password = credentials.password,
  role = "ADMIN",
}: {
  role: UserRole;
  email?: string;
  name?: string;
  password?: string;
}): Promise<void> => {
  const res = await request(app)
    .post("/api/auth/sign-up/email")
    .send({ email, password, name });
  if (res.status !== 200) throw new Error(`Sign-in failed: ${res.status}`);

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!user) throw new Error("user not found, cant set role");
  await prisma.user.update({ where: { email }, data: { role } });
};

export const getAuthToken = async (
  email = credentials.email,
  password = credentials.password,
): Promise<string> => {
  const res = await request(app)
    .post("/api/auth/sign-in/email")
    .send({ email, password });

  if (res.status !== 200) throw new Error(`Sign-in failed: ${res.status}`);
  return res.body.token;
};

export const removeUser = async (email = credentials.email): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  if (!user) throw new Error(`no user found`);
  await prisma.user.delete({ where: { email } });
};
