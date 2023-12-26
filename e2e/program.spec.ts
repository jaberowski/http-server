import { Express } from "express";
import request from "supertest";
import { loginAdminTest } from "./utility";
import { AppDataSource } from "../src/utility/data-source";
import { seedUser } from "../src/utility/seed";
import { makeApp } from "../src/api";

describe("Program", () => {
  let app: Express;
  beforeAll(async () => {
    const dataSource = await AppDataSource.initialize();
    app = makeApp(dataSource);
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  describe("create", () => {
    it("should fail if we didd not login", async () => {
      const adminUser = await loginAdminTest(app);
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
      const adminUser = await loginAdminTest(app);
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
