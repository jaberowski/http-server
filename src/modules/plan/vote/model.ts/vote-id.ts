import { z } from "zod";
import { Brand } from "../../../../utility/brand";

export type VoteId = Brand<number, "VoteId">;

export const isVoteId = (value: number): value is VoteId => {
  return value > 0 && Number.isInteger(value);
};

export const zodVoteId = z.coerce.number().refine(isVoteId);
