import { Router } from "express";
import { handleExpress } from "../utility/handle-express";
import { createPlanDto } from "../modules/plan/dto/create-plan.dto";
import { ZodError, z } from "zod";
import { loginMiddleWare } from "../login.middleware";
import { createProgramDto } from "../modules/plan/program/dto/create-program.dto";
import { PlanService } from "../modules/plan/plan.service";
import { UserService } from "../modules/user/User.service";
import { zodPlanId } from "../modules/plan/model/plan-id";
import { VoteService } from "../modules/plan/vote/vote.service";
import { zodProgramId } from "../modules/plan/program/model/program-id";

export const makePlanRoute = (
  planService: PlanService,
  userService: UserService,
  voteService: VoteService
): Router => {
  const app = Router();

  app.post("", loginMiddleWare(userService), (req, res) => {
    const loggedInUser = req.user;
    if (loggedInUser.role !== "Admin") {
      res.status(403).send({ message: "not admin" });
      return;
    }
    try {
      const dto = createPlanDto.parse(req.body);
      handleExpress(res, () => planService.createPlan(dto, loggedInUser));
    } catch (e) {
      if (e instanceof ZodError) {
        res.status(400).send({ message: e.errors });
      }
    }
  });

  app.post("/:id/program", loginMiddleWare(userService), (req, res) => {
    const loggedInUser = req.user;

    try {
      const dto = createProgramDto.parse({
        ...req.body,
        planId: req.params.id,
      });
      handleExpress(res, () => planService.createProgram(dto, loggedInUser));
    } catch (e) {
      if (e instanceof ZodError) {
        res.status(400).send({ message: e.errors });
      }
    }
  });

  app.post(
    "/:id/program/:programId/vote",
    loginMiddleWare(userService),
    (req, res) => {
      try {
        const programId = zodProgramId.parse(req.params.programId);
        const planId = zodPlanId.parse(req.params.id);
        handleExpress(res, () =>
          voteService.vote({ programId, planId }, req.user)
        );
      } catch (e) {
        if (e instanceof ZodError) {
          res.status(400).send({ message: e.errors });
        }
      }
    }
  );

  app.get("/:id", (req, res) => {
    try {
      const id = zodPlanId.parse(req.params.id);
      handleExpress(res, () => planService.getPlanById(id));
    } catch (e) {
      if (e instanceof ZodError) {
        res.status(400).send({ message: e.errors });
      }
    }
  });

  return app;
};
