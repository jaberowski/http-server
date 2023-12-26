import { Router } from "express";
import { v4 } from "uuid";
import { handleExpress } from "../utility/handle-express";
import { loginUserDto } from "../modules/user/dto/loginUser.dto";
import { User } from "../modules/user/model/user";
import { ZodError } from "zod";
import { UserService } from "../modules/user/User.service";

export const makeUserRoute = (userService: UserService) => {
  const app = Router();

  app.post("/login", (req, res) => {
    try {
      const { username, password } = loginUserDto.parse(req.body);
      handleExpress(res, () => userService.login({ username, password }));
    } catch (e) {
      if (e instanceof ZodError) {
        res.status(400).send({ message: e.errors });
      }
    }
  });
  return app;
};
