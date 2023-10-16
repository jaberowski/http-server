import { Router } from "express";
import { users } from "./user.route";
import { isNonEmptyString } from "../utility/non-empty-string";
import { createProgramDto } from "../modules/program/dto/create-program.dto";
import { ZodError } from "zod";
import { handleExpress } from "../utility/handle-express";
import { createProgram } from "../modules/program/create-program";
import { loginMiddleWare } from "../login.middleware";

export interface Program {
  planId: number;
  title: string;
  description?: string;
  id: number;
  userId: string;
}

const app = Router();

app.post("/", loginMiddleWare, (req, res) => {
  const userId = req.headers["authorization"];

  const loggedInUser = req.user;

  try {
    const dto = createProgramDto.parse(req.body);
    handleExpress(res, () => createProgram(dto, loggedInUser));
  } catch (e) {
    if (e instanceof ZodError) {
      res.status(400).send({ message: e.errors });
    }
  }
});

export { app as programRouter };
