import { Router } from "express";
import { createProgramDto } from "../modules/program/dto/create-program.dto";
import { ZodError } from "zod";
import { handleExpress } from "../utility/handle-express";
import { createProgram } from "../modules/program/create-program";
import { loginMiddleWare } from "../login.middleware";
import { planRepository } from "../dependency";

const app = Router();

app.post("/", loginMiddleWare, (req, res) => {
  const loggedInUser = req.user;

  try {
    const dto = createProgramDto.parse(req.body);
    handleExpress(res, () => createProgram(dto, loggedInUser, planRepository));
  } catch (e) {
    if (e instanceof ZodError) {
      res.status(400).send({ message: e.errors });
    }
  }
});

export { app as programRouter };
