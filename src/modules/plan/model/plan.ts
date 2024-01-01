import { Program } from "../program/model/program";
import { NonEmptyString } from "../../../data/non-empty-string";
import { PlanId } from "./plan-id";
import { FutureDate, isFutureDate } from "../../../data/future-date";
export interface Plan {
  id: PlanId;
  title: NonEmptyString;
  description: string;
  deadLineProgram: Date;
  deadLineVote: Date;
  programs: Program[];
}

export interface FuturePlan extends Plan {
  deadLineProgram: FutureDate;
}

export const isFuturePlan = (plan: Plan): plan is FuturePlan =>
  isFutureDate(plan.deadLineProgram);
