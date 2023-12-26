import { NextFunction, Request, Response } from "express";
import { UserService } from "./modules/user/User.service";
import { zodUserId } from "./modules/user/model/user-id";
import { ZodError } from "zod";

export const loginMiddleWare =
  (userService: UserService) =>
  async (req: Request, res: Response, next: NextFunction) => {
    let userId;
    try {
      userId = zodUserId.parse(req.headers["authorization"]);
    } catch (e) {
      if (e instanceof ZodError) {
        res.status(401).send({ message: "Unauthorized" });
        return;
      }
    }

    if (!userId) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }

    const loggedInUser = await userService.loginById(userId);

    if (!loggedInUser) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }

    req.user = loggedInUser;

    next();
  };
