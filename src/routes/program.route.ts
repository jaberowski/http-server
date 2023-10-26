import { Router } from "express";
import { ZodError } from "zod";
import { handleExpress, parseExpress } from "../utility/handle-express";
import { loginMiddleWare } from "../login.middleware";
import { createProgramDto } from "../modules/plan/program/dto/create-program.dto";
import { planService } from "../dependency";

const app = Router();
app.post("/", loginMiddleWare, (req, res) => {
  const loggedInUser = req.user;
  const dto = parseExpress(res, createProgramDto, req.body);
  handleExpress(res, () => planService.createProgram(dto, loggedInUser));
});

export { app as programRouter };
