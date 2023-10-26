import express, { ErrorRequestHandler } from "express";
import { planRouter } from "./routes/plan.route";
import { userRouter } from "./routes/user.route";
import { ZodError } from "zod";

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

const errorHandling: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof ZodError) {
    res.status(400).send({ message: error.message });
  }
  res.status(500);
};

app.use(errorHandling);
