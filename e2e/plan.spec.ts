import { Express } from "express";
import request from "supertest";
import { loginAdminTest, loginRepesentorTest } from "./utility";
import { AppDataSource } from "../src/data-source";
import { makeApp } from "../src/api";

describe("Plan", () => {
  let app: Express;
  beforeAll(async () => {
    const dataSource = await AppDataSource.initialize();
    app = makeApp(dataSource);
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });
  describe("create", () => {
    it("should send bad request if title is empty or not provided", async () => {
      const user = await loginAdminTest(app);
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
      const user = await loginRepesentorTest(app);
      const today = new Date();
      const tomorow = new Date(today.setDate(today.getDate() + 1));
      const nextWeek = new Date(today.setDate(today.getDate() + 7));
      await request(app)
        .post("/plan")
        .set("Authorization", user.id)
        .send({
          description: "oromie is a nice place",
          title: "oromie",
          deadLineProgram: tomorow,
          deadLineVote: nextWeek,
        })
        .expect(403);
    });

    it("should create a plan if we are logged in", async () => {
      const user = await loginAdminTest(app);
      const today = new Date();
      const tomorow = new Date(today.setDate(today.getDate() + 1));
      const nextWeek = new Date(today.setDate(today.getDate() + 7));
      const { body: plan } = await request(app)
        .post("/plan")
        .set("Authorization", user.id)
        .send({
          title: "oromie",
          description: "oromie is a nice place",
          deadLineProgram: tomorow,
          deadLineVote: nextWeek,
        })
        .expect(200);

      expect(plan.title).toBe("oromie");
    });
  });

  describe("read", () => {
    it("should read the plan", async () => {
      const user = await loginAdminTest(app);
      const today = new Date();
      const tomorow = new Date(today.setDate(today.getDate() + 1));
      const nextWeek = new Date(today.setDate(today.getDate() + 7));

      const title = "oromie";
      const { body: plan } = await request(app)
        .post("/plan")
        .set("Authorization", user.id)
        .send({
          title,
          description: "oromie is a nice place",
          deadLineProgram: tomorow,
          deadLineVote: nextWeek,
        })
        .expect(200);

      const { body: resultPlan } = await request(app)
        .get("/plan/" + plan.id)
        .expect(200);

      expect(resultPlan.title).toBe(title);
    });
  });
});
