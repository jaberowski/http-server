import { Express } from "express";
import { makeApp } from "../src/api";
import { AppDataSource } from "../src/data-source";
import {
  loginAdminTest,
  loginNormalTest,
  loginRepesentorTest,
} from "./utility";
import request from "supertest";
import { PlanEntity } from "../src/modules/plan/enitty/plan.entity";
import { ProgramEntity } from "../src/modules/plan/program/entity/program.entity";
import { v4 } from "uuid";

describe("vote", () => {
  let app: Express;
  beforeAll(async () => {
    const dataSource = await AppDataSource.initialize();
    app = makeApp(dataSource);
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });
  describe("Add Vote", () => {
    it("shoud create a vote and the program should have voteCouted 1", async () => {
      const userAdmin = await loginAdminTest(app);
      const UserRepresentative = await loginRepesentorTest(app);
      const userNormal = await loginNormalTest(app);

      const today = new Date();
      const tomorow = new Date(today.setDate(today.getDate() + 1));
      const nextWeek = new Date(today.setDate(today.getDate() + 7));
      const { body: plan } = await request(app)
        .post("/plan")
        .set("Authorization", userAdmin.id)
        .send({
          title: "oromie",
          description: "oromie is a nice place",
          deadLineProgram: tomorow,
          deadLineVote: nextWeek,
        })
        .expect(200);

      const { body: planWithPrograms } = await request(app)
        .post(`/plan/${plan.id}/program`)
        .set("Authorization", UserRepresentative.id)
        .send({ title: "mohandesi" })
        .expect(200);

      const programId = planWithPrograms.programs[0].id;
      const now = new Date();

      await AppDataSource.getRepository(PlanEntity).update(
        { id: planWithPrograms.id },
        { deadLineProgram: new Date(now.setDate(now.getDate() - 1)) }
      );

      const { body: vote } = await request(app)
        .post(
          `/plan/${plan.id}/program/${planWithPrograms.programs[0].id}/vote`
        )
        .set("authorization", userNormal.id)
        .send()
        .expect(200);

      const { body: resultPlan } = await request(app)
        .get(`/plan/${plan.id}`)
        .expect(200);

      expect(resultPlan.programs[0].votedCount).toBe(1);
    });
  });
});
