import { z } from "zod";
import { Brand } from "../utility/brand";
import { validate } from "uuid";

export type UUID = Brand<string, "UUID">;

const isUUID = (value: string): value is UUID => {
  return validate(value);
};

export const zodUUID = z.string().refine(isUUID);
