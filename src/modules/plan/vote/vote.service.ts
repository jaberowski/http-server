import { ForbiddenError, HttpError } from "../../../utility/http-error";
import { User, UserNormal, isNormalUser } from "../../user/model/user";
import { PlanId } from "../model/plan-id";
import { PlanService } from "../plan.service";
import { ProgramId } from "../program/model/program-id";
import { IVoteRepository } from "./vote.repository";
import {
  CreateVote,
  NoVoteForPlan,
  getValidForVotePlan,
} from "./model.ts/vote";

export class VoteService {
  constructor(
    private VoteRepo: IVoteRepository,
    private planService: PlanService
  ) {}

  async vote(
    { planId, programId }: { planId: PlanId; programId: ProgramId },
    user: User
  ) {
    if (!isNormalUser(user)) {
      throw new ForbiddenError();
    }
    const plan = await this.planService.getPlanById(planId);

    const validVotePlan = getValidForVotePlan(plan);

    if (!validVotePlan) {
      throw new HttpError(400, "you can not vote for this plan");
    }

    const noVote = await this.getNoVoteForPlan(user, planId);

    await this.VoteRepo.addVote({
      user,
      plan: validVotePlan,
      date: new Date(),
      noVoteForPlan: noVote,
      programId,
    });
  }

  private async getNoVoteForPlan(user: UserNormal, planId: PlanId) {
    const existingVote = await this.VoteRepo.getVote({ user, planId });

    const NoVote: NoVoteForPlan =
      existingVote._tag === "vote"
        ? await this.VoteRepo.deleteVote(existingVote.data)
        : existingVote;
    return NoVote;
  }
}
