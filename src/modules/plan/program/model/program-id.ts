import { z } from "zod";
import { Brand } from "../../../../utility/brand";

export type ProgramId = Brand<number, "PlanId">;

export const isProgramId = (value: number): value is ProgramId => {
  return value > 0 && Number.isInteger(value);
};

export const zodProgramId = z.coerce.number().refine(isProgramId);
