import { app } from "../src/api";
import request from "supertest";
import { loginAdminTest } from "./utility";

describe("Program", () => {
  describe("create", () => {
    it("should fail if we didd not login", async () => {
      const adminUser = await loginAdminTest();
      const today = new Date();
      const tomorrow = new Date(today.setDate(today.getDate() + 1));
      const { body: plan } = await request(app)
        .post("/plan")
        .set("Authorization", adminUser.id)
        .send({
          title: "oromie",
          description: "oromie is a nice place",
          deadLine: tomorrow,
        })
        .expect(200);

      await request(app).post(`/plan/${plan.id}/program`).expect(401);
    });

    it("should fail if title is not string or an empty one", async () => {
      const adminUser = await loginAdminTest();
      const today = new Date();
      const tomorrow = new Date(today.setDate(today.getDate() + 1));
      const { body: plan } = await request(app)
        .post("/plan")
        .set("Authorization", adminUser.id)
        .send({
          title: "oromie",
          description: "oromie is a nice place",
          deadLine: tomorrow,
        })
        .expect(200);
      await request(app)
        .post(`/plan/${plan.id}/program`)
        .set("authorization", adminUser.id)
        .send({ title: "" })
        .expect(400)
        .send({ message: "bad request" });
    });
  });
});
