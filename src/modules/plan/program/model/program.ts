import { WholeNumber } from "../../../../data/int";
import { NonEmptyString } from "../../../../data/non-empty-string";
import { UserId } from "../../../user/model/user-id";
import { PlanId } from "../../model/plan-id";
import { ProgramId } from "./program-id";

export interface Program {
  planId: PlanId;
  title: NonEmptyString;
  description?: string;
  id: ProgramId;
  userId: UserId;
  votedCount: WholeNumber;
}
