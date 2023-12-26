import { z } from "zod";
import { zodNonEmptyString } from "../../../../data/non-empty-string";
import { zodPlanId } from "../../model/plan-id";

export const createProgramDto = z.object({
  title: zodNonEmptyString,
  description: z.string().optional(),
  planId: zodPlanId,
});

export type CreateProgramDto = z.infer<typeof createProgramDto>;
