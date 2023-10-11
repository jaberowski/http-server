import http from "http";
import { parse } from "url";
import express from "express";
import { type } from "os";
import { v4 } from "uuid";
import { planRouter } from "./routes/plan.route";
import { userRouter } from "./routes/user.route";

export const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/plan", planRouter);
app.use(userRouter);

app.use((req, res) => {
  res.status(404).send({ message: "Not Found KaKA" });
});
