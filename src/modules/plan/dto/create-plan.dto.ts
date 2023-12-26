import { z } from "zod";
import { zodNonEmptyString } from "../../../data/non-empty-string";

export const createPlanDto = z.object({
  title: zodNonEmptyString,
  description: z.string().optional(),
  deadLine: z.coerce.date(),
});

export type CreatePlanDto = z.infer<typeof createPlanDto>;
