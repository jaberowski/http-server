import { Router } from "express";
import { users } from "./user.route";
import { isNonEmptyString } from "../utility/non-empty-string";
interface Plan {
  id: number;
  title: string;
  description: string;
}

const plans: Plan[] = [];

export const app = Router();

app.post("", (req, res) => {
  const userId = req.headers["authorization"];

  const loggedInUser = users.find((x) => x.id === userId);
  if (!loggedInUser) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  const { title, description } = req.body;
  if (!isNonEmptyString(title)) {
    res.status(400).send({ message: "title should be string and none empty" });
    return;
  }

  const plan = {
    id: plans.length + 1,
    title,
    description: description || "",
  };

  plans.push(plan);

  res.status(200).send(plan);
});

app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send({ message: "Id should be a number" });
    return;
  }

  const plan = plans.find((planItem) => {
    return id === planItem.id;
  });

  if (plan === undefined) {
    res.status(404).send({ message: "Plan Not Found" });
    return;
  }

  res.status(200).send(plan);
  return;
});

export { app as planRouter };
