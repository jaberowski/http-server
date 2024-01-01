import request from "supertest";
import {
  User,
  UserAdmin,
  UserNormal,
  UserRepresentative,
} from "../src/modules/user/model/user";
import { Express } from "express";

export const loginAdminTest = async (app: Express) => {
  const { body: user } = await request(app)
    .post("/login")
    .send({ username: "admin", password: "admin" })
    .expect(200);
  return user as UserAdmin;
};

export const loginRepesentorTest = async (app: Express) => {
  const { body: user }: { body: User } = await request(app)
    .post("/login")
    .send({ username: "rep", password: "rep" })
    .expect(200);

  return user as UserRepresentative;
};

export const loginNormalTest = async (app: Express) => {
  const { body: user }: { body: User } = await request(app)
    .post("/login")
    .send({ username: "normal", password: "normal" })
    .expect(200);

  return user as UserNormal;
};
