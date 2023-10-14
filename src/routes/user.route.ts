import { Router } from "express";
import { v4 } from "uuid";
import { isNonEmptyString } from "../utility/non-empty-string";
import { HttpError } from "../utility/my-error";
import { handleExpress } from "../utility/handle-express";
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
  const { username, password } = req.body;
  if (!isNonEmptyString(username)) {
    res
      .status(400)
      .send({ message: "username should be string and non empty" });
    return;
  }

  handleExpress(res, () => login({ username, password }));
});

const login = (dto: { username: string; password: string }) => {
  const user = users.find(
    (userItem) =>
      userItem.username === dto.username && userItem.password === dto.password
  );
  if (user === undefined) {
    throw new HttpError(400, "user not found");
  }
  return user;
};

export { app as userRouter };
