import request from "supertest";
import { response } from "express";
import { app } from "../src/api";
import { loginAdminTest } from "./utility";

describe("Plan", () => {
  describe("create", () => {
    it("should send bad request if title is empty or not provided", async () => {
      const user = await loginAdminTest();
      await request(app)
        .post("/plan")
        .set("Authorization", user.id)
        .send({ description: "oromie is a nice place" })
        .expect(400);
    });
    it("should fail if we did not login", async () => {
      await request(app).post("/plan").expect(401);
    });
    it("should create a plan if we are logged in", async () => {
      const user = await loginAdminTest();
      const { body: plan } = await request(app)
        .post("/plan")
        .set("Authorization", user.id)
        .send({
          title: "oromie",
          description: "oromie is a nice place",
          deadLine: new Date(),
        })
        .expect(200);

      expect(plan.title).toBe("oromie");
    });
  });
  describe("read", () => {
    it("should read the plan", async () => {
      const user = await loginAdminTest();
      const title = "oromie";
      const { body: plan } = await request(app)
        .post("/plan")
        .set("Authorization", user.id)
        .send({
          title,
          description: "oromie is a nice place",
          deadLine: new Date(),
        })
        .expect(200);

      const { body: resultPlan } = await request(app)
        .get("/plan/" + plan.id)
        .expect(200);

      expect(resultPlan.title).toBe(title);
    });
  });
});
