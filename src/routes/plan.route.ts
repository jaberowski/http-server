import { Router } from "express";
import { handleExpress } from "../utility/handle-express";
import { createPlan } from "../modules/plan/create-plan";
import { getPlanById } from "../modules/plan/get-plan-by-id";
import { createPlanDto } from "../modules/plan/dto/create-plan.dto";
import { ZodError, z } from "zod";
import { Program } from "./program.route";
import { loginMiddleWare } from "../login.middleware";
export interface Plan {
  id: number;
  title: string;
  description: string;
  deadLine: Date;
  programs: Program[];
}

export const plans: Plan[] = [];

export const app = Router();

app.post("", loginMiddleWare, (req, res) => {
  const loggedInUser = req.user;
  if (loggedInUser.role !== "Admin") {
    res.status(403).send({ message: "not admin" });
    return;
  }

  try {
    const dto = createPlanDto.parse(req.body);
    handleExpress(res, () => createPlan(dto, loggedInUser));
  } catch (e) {
    if (e instanceof ZodError) {
      res.status(400).send({ message: e.errors });
    }
  }
});

app.get("/:id", (req, res) => {
  try {
    const id = z.coerce.number().parse(req.params.id);
    handleExpress(res, () => getPlanById(id));
  } catch (e) {
    if (e instanceof ZodError) {
      res.status(400).send({ message: e.errors });
    }
  }
});

export { app as planRouter };
