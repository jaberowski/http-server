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
  });
});
