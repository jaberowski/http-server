import { ZodError, ZodTypeAny } from "zod";
import { HttpError } from "./http-error";
import { Response } from "express";

export const parseExpress = (
  res: Response,
  zodDto: ZodTypeAny,
  rawData: any
) => {
  try {
    const dto = zodDto.parse(rawData);
    return dto;
  } catch (e) {
    if (e instanceof ZodError) {
      res.status(400).send({ message: e.errors });
    }
    res.status(500).send();
  }
};

export const handleExpress = <A>(res: Response, fn: () => A) => {
  try {
    const data = fn();
    res.status(200).send(data);
    return;
  } catch (e) {
    if (e instanceof HttpError) {
      res.status(e.status).send({ message: e.message });
      return;
    }
    res.status(500).send();
    return;
  }
};
