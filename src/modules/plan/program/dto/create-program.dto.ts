import { z } from "zod";

export const createProgramDto = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  planId: z.coerce.number(),
});

export type CreateProgramDto = z.infer<typeof createProgramDto>;
