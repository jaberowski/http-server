import { Router } from "express";
import { v4 } from "uuid";
import { handleExpress, parseExpress } from "../utility/handle-express";
import { loginUserDto } from "../modules/user/dto/loginUser.dto";
import { User } from "../modules/user/model/user";
import { userService } from "../dependency";

const app = Router();

app.post("/login", (req, res) => {
  const { username, password } = parseExpress(res, loginUserDto, req.body);
  handleExpress(res, () => userService.loginUserByInfo({ username, password }));
});

export { app as userRouter };
