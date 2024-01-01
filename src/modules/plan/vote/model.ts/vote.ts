import { promises } from "dns";
import { FutureDate, isFutureDate } from "../../../../data/future-date";
import { PastDate, isPastDate } from "../../../../data/past-date";
import { UserNormal } from "../../../user/model/user";
import { UserId } from "../../../user/model/user-id";
import { Plan } from "../../model/plan";
import { PlanId } from "../../model/plan-id";
import { ProgramId } from "../../program/model/program-id";
import { VoteId } from "./vote-id";

export interface Vote {
  id: VoteId;
  userId: UserId;
  programId: ProgramId;
  planId: PlanId;
  date: Date;
}

interface ValidForVotePlan extends Plan {
  deadLineVote: FutureDate;
  deadLineProgram: PastDate;
}

export const getValidForVotePlan = (plan: Plan) => {
  return isFutureDate(plan.deadLineVote) && isPastDate(plan.deadLineProgram)
    ? {
        ...plan,
        deadLineVote: plan.deadLineVote,
        deadLineProgram: plan.deadLineProgram,
      }
    : undefined;
};

export interface CreateVote {
  user: UserNormal;
  plan: ValidForVotePlan;
  date: Date;
  noVoteForPlan: NoVoteForPlan;
  programId: ProgramId;
}

export interface GetVote {
  user: UserNormal;
  planId: PlanId;
}

export interface NoVoteForPlan {
  planId: PlanId;
  userId: UserId;
  _tag: "No_Vote";
}

/* 

//save vote
1 - bad az deadline bashe 
2 - ghable az deadline vote bashe 
3 - user yek program ro mitoone vote bekone
4 - user bayad normal bashe


//get vote 
faghat user mitone vote khodesho bebine va ye planId 
user ham normal bashe

// program delete vote 
faghat user normal mitoone vote khodesho pak kone baraye ye planID


// program add vote dashte bashe

// 

*/
