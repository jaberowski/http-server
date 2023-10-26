import { Router } from "express";
import { handleExpress, parseExpress } from "../utility/handle-express";
import { createPlanDto } from "../modules/plan/dto/create-plan.dto";
import { ZodError, z } from "zod";
import { loginMiddleWare } from "../login.middleware";
import { Plan } from "../modules/plan/model/plan";
import { planService } from "../dependency";
import { createProgramDto } from "../modules/plan/program/dto/create-program.dto";

export const plans: Plan[] = [];

export const app = Router();

app.post("", loginMiddleWare, (req, res) => {
  const loggedInUser = req.user;
  if (loggedInUser.role !== "Admin") {
    res.status(403).send({ message: "not admin" });
    return;
  }

  const dto = parseExpress(res, createPlanDto, req.body);
  handleExpress(res, () => planService.createPlan(dto, loggedInUser));
});

app.post("/:id/program", loginMiddleWare, (req, res) => {
  const loggedInUser = req.user;

  try {
    const dto = createProgramDto.parse({ ...req.body, planId: req.params.id });
    handleExpress(res, () => planService.createProgram(dto, loggedInUser));
  } catch (e) {
    if (e instanceof ZodError) {
      res.status(400).send({ message: e.errors });
    }
  }
});

app.get("/:id", (req, res) => {
  try {
    const id = parseExpress(res, z.coerce.number(), req.params.id);
    handleExpress(res, () => planService.getPlanById(id));
  } catch (e) {
    if (e instanceof ZodError) {
      res.status(400).send({ message: e.errors });
    }
  }
});

export { app as planRouter };
