import http from "http";
import { parse } from "url";
import express from "express";

interface Plan {
  id: number;
  title: string;
  description: string;
}

const plans: Plan[] = [];

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.post("/plan", (req, res) => {
  const { title, description } = req.body;
  if (
    title === undefined ||
    typeof title !== "string" ||
    (typeof title === "string" && title.length === 0)
  ) {
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

app.get("/plan/:id", (req, res) => {
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

app.use((req, res) => {
  res.status(404).send({ message: "Not Found KaKA" });
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
