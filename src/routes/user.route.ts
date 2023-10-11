import { Router } from "express";
import { v4 } from "uuid";
import { isNonEmptyString } from "../utility/non-empty-string";
type UserRole = "Admin" | "Resresentative" | "Normal";
interface User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
}

const app = Router();

export const users: User[] = [
  { id: v4(), username: "admin", password: "admin", role: "Admin" },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!isNonEmptyString(username)) {
    res
      .status(400)
      .send({ message: "username should be string and non empty" });
    return;
  }

  const user = users.find(
    (x) => x.username === username && x.password === password
  );

  if (user === undefined) {
    res.status(401).send({ message: "invalid user or password" });
    return;
  }

  res.status(200).send(user);
  return;
});

export { app as userRouter };
