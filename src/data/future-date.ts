import { z } from "zod";
import { Brand } from "../utility/brand";

export type FutureDate = Brand<Date, "future">;

export const isFutureDate = (date: Date): date is FutureDate => {
  return date.getTime() > new Date().getTime();
};

export const zodFutureDate = z.coerce.date();
