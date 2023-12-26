import { Brand } from "../utility/brand";

export type PastDate = Brand<Date, "past">;

export const isPastDate = (date: Date): date is PastDate => {
  return date.getTime() < new Date().getTime();
};
