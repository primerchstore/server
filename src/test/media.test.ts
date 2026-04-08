import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../app.js";
import { getAuthToken, removeUser, signIn } from "../helpers/test/auth.js";

describe("Media", () => {
  let token: string;
  beforeAll(async () => {
    await signIn({ role: "ADMIN" });
    token = await getAuthToken();
  });

  it("GET /admin/medias/query — returns all media", async () => {
    const res = await request(app)
      .get("/api/admin/medias/query")
      .set("Authorization", `Bearer ${token}`)

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
