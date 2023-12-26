import express, { ErrorRequestHandler } from "express";

import { ZodError } from "zod";
import { makePlanRoute } from "./routes/plan.route";
import { makeUserRoute } from "./routes/user.route";
import { PlanService } from "./modules/plan/plan.service";
import { UserService } from "./modules/user/User.service";
import { PlanRepository } from "./modules/plan/plan.repository";
import { DataSource } from "typeorm";
import { UserRepository } from "./modules/user/user.repository";

export const makeApp = (dataSource: DataSource) => {
  const app = express();

  app.use(express.json());

  app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
  });

  const planRepo = new PlanRepository(dataSource);
  const UserRepo = new UserRepository(dataSource);

  const planService = new PlanService(planRepo);
  const userService = new UserService(UserRepo);

  app.use("/plan", makePlanRoute(planService, userService));
  app.use(makeUserRoute(userService));

  app.use((req, res) => {
    res.status(404).send({ message: "Not Found KaKA" });
  });

  const errorHandling: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof ZodError) {
      res.status(400).send({ message: error.message });
    }
    res.status(500);
  };

  app.use(errorHandling);
  return app;
};
