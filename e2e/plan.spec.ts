import request from "supertest";
import { response } from "express";
import { app } from "../src/api";

describe("Plan", () => {
  describe("create", () => {
    it("should fail if we did not login", async () => {
      await request(app).post("/plan").expect(401);
    });
    it("should create a plan if we are logged in", async () => {
      const { body: user } = await request(app)
        .post("/login")
        .send({ username: "admin", password: "admin" })
        .expect(200);

      //   const { body: plan } = (await request(app).post("/plan")).headers();
      const { body: plan } = await request(app)
        .post("/plan")
        .set("Authorization", user.id)
        .send({ title: "oromie", description: "oromie is a nice place" })
        .expect(200);

      expect(plan.title).toBe("oromie");
    });
  });
});
