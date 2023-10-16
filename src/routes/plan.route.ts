import { Response, Router } from "express";
import { User, users } from "./user.route";
import { isNonEmptyString } from "../utility/non-empty-string";
import { HttpError } from "../utility/my-error";
import { handleExpress } from "../utility/handle-express";
import { createPlan } from "../plan/create-plan";
import { getPlanById } from "../plan/get-plan-by-id";
import { createPlanDto } from "../plan/dto/create-plan.dto";
import { ZodError, z } from "zod";
export interface Plan {
  id: number;
  title: string;
  description: string;
  deadLine: Date;
}

export const plans: Plan[] = [];

export const app = Router();

app.post("", (req, res) => {
  const userId = req.headers["authorization"];

  const loggedInUser = users.find((x) => x.id === userId);
  if (!loggedInUser) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }
  if (loggedInUser.role !== "Admin") {
    res.status(403).send({ message: "not admin" });
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
    console.log(e);
    if (e instanceof ZodError) {
      res.status(400).send({ message: e.errors });
    }
  }
});

export { app as planRouter };
