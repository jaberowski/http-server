import { Router } from "express";
import { v4 } from "uuid";
import { handleExpress } from "../utility/handle-express";
import { loginUserDto } from "../modules/user/dto/loginUser.dto";
import { ZodError } from "zod";
import { login } from "../modules/user/login";
type UserRole = "Admin" | "Representative" | "Normal";
export interface User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
}

const app = Router();

export const users: User[] = [
  { id: v4(), username: "admin", password: "admin", role: "Admin" },
  { id: v4(), username: "rep", password: "rep", role: "Representative" },
];

app.post("/login", (req, res) => {
  // const { username, password } = req.body;
  try {
    const { username, password } = loginUserDto.parse(req.body);
    handleExpress(res, () => login({ username, password }));
  } catch (e) {
    if (e instanceof ZodError) {
      res.status(400).send({ message: e.errors });
    }
  }
});

export { app as userRouter };
