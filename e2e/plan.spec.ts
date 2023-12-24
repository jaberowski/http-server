import request from "supertest";
import { app } from "../src/api";
import { loginAdminTest, loginRepesentorTest } from "./utility";
import { AppDataSource } from "../src/utility/data-source";
import { seedUser } from "../src/utility/seed";

describe("Plan", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await seedUser();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });
  describe("create", () => {
    it("should send bad request if title is empty or not provided", async () => {
      const user = await loginAdminTest();
      await request(app)
        .post("/plan")
        .set("Authorization", user.id)
        .send({ description: "oromie is a nice place" })
        .expect(400);

      await request(app)
        .post("/plan")
        .set("authorization", user.id)
        .send({ description: "oromie is a nice place", title: "" })
        .expect(400);
    });

    it("should fail if we did not login", async () => {
      await request(app).post("/plan").expect(401);
    });

    it("should fail if user is not admin", async () => {
      const user = await loginRepesentorTest();
      const today = new Date();
      const tomorow = new Date(today.setDate(today.getDate() + 1));
      await request(app)
        .post("/plan")
        .set("Authorization", user.id)
        .send({
          description: "oromie is a nice place",
          title: "oromie",
          deadline: tomorow,
        })
        .expect(403);
    });

    it("should create a plan if we are logged in", async () => {
      const user = await loginAdminTest();
      const today = new Date();
      const tomorow = new Date(today.setDate(today.getDate() + 1));
      const { body: plan } = await request(app)
        .post("/plan")
        .set("Authorization", user.id)
        .send({
          title: "oromie",
          description: "oromie is a nice place",
          deadLine: tomorow,
        })
        .expect(200);

      expect(plan.title).toBe("oromie");
    });
  });

  describe("read", () => {
    it("should read the plan", async () => {
      const user = await loginAdminTest();
      const today = new Date();
      const tomorow = new Date(today.setDate(today.getDate() + 1));
      const title = "oromie";
      const { body: plan } = await request(app)
        .post("/plan")
        .set("Authorization", user.id)
        .send({
          title,
          description: "oromie is a nice place",
          deadLine: tomorow,
        })
        .expect(200);

      const { body: resultPlan } = await request(app)
        .get("/plan/" + plan.id)
        .expect(200);

      expect(resultPlan.title).toBe(title);
    });
  });
});
