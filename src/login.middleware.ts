import { NextFunction, Request, Response } from "express";
import { users } from "./routes/user.route";

export const loginMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers["authorization"];

  const loggedInUser = users.find((x) => x.id === userId);

  if (!loggedInUser) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  req.user = loggedInUser;

  next();
};
