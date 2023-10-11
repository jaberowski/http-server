import { Router } from "express";
import { users } from "./user.route";
import { isNonEmptyString } from "../utility/non-empty-string";

interface Program {
  planId: number;
  title: string;
  description: string;
  id: number;
}

const app = Router();

app.post("/", (req, res) => {
  const userId = req.headers["authorization"];

  const loggedInUser = users.find((x) => x.id === userId);
  if (!loggedInUser) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  const { title, description, planId } = req.body;

  if (!isNonEmptyString(title)) {
    res.status(400).send({ message: "title should be a string and non empty" });
    return;
  }
});

export { app as programRouter };
