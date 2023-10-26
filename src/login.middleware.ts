import { NextFunction, Request, Response } from "express";
import { handleExpress } from "./utility/handle-express";
import { userService } from "./dependency";

export const loginMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers["authorization"];

  const loggedInUser = userService.loginUserById(userId);

  if (!loggedInUser) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  req.user = loggedInUser;

  next();
};
