import { app } from "../src/api";
import request from "supertest";
import { loginAdminTest } from "./utility";

describe("Program", () => {
  describe("create", () => {
    it("should fail if we didd not login", async () => {
      await request(app).post("/program").expect(401);
    });

    it("should fail if title is not string or an empty one", async () => {
      const user = await loginAdminTest();
      await request(app)
        .post("/program")
        .set("authorization", user.id)
        .send({ title: "" })
        .expect(400)
        .send({ message: "bad request" });
    });

    it("it should fail if deaddline is exceeded", async () => {
      const user = await loginAdminTest();
      const today = new Date();
      const yesterday = new Date(today.setDate(today.getDate() - 1));

      const { body: plan } = await request(app)
        .post("/plan")
        .set("Authorization", user.id)
        .send({
          title: "oromie",
          description: "oromie is a nice place",
          deadLine: yesterday,
        })
        .expect(200);

      const { body: program } = await request(app)
        .post("/program")
        .set("authorization", user.id)
        .send({
          title: "oromie",
          description: "sdlkjf",
          planId: plan.id,
        })
        .expect(400);
    });
  });
});
