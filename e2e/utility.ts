import request from "supertest";
import { app } from "../src/api";
import { User } from "../src/modules/user/model/user";

export const loginAdminTest = async () => {
  const { body: user } = await request(app)
    .post("/login")
    .send({ username: "admin", password: "admin" })
    .expect(200);
  return user;
};

export const loginRepesentorTest = async () => {
  const { body: user }: { body: User } = await request(app)
    .post("/login")
    .send({ username: "rep", password: "rep" })
    .expect(200);

  return user;
};
