import { DataSource, Repository } from "typeorm";
import { CreateVote, GetVote, NoVoteForPlan, Vote } from "./model.ts/vote";
import { VoteEntity } from "./entity/vote.entity";
import { ProgramEntity } from "../program/entity/program.entity";

// export interface IPlanRepo {
//   voteForProgram: (vote: Vote) => Promise<void>;
//   removeVoteFromProgram: (vote: Vote) => Promise<void>;
// }

export interface IVoteRepository {
  addVote: (create: CreateVote) => Promise<void>;
  getVote: (
    get: GetVote
  ) => Promise<{ _tag: "vote"; data: Vote } | NoVoteForPlan>;
  deleteVote: (vote: Vote) => Promise<NoVoteForPlan>;
}

export class VoteRepository implements IVoteRepository {
  private voteRepo: Repository<VoteEntity>;
  constructor(private dataSource: DataSource) {
    this.voteRepo = dataSource.getRepository(VoteEntity);
  }
  async addVote(create: CreateVote): Promise<void> {
    await this.dataSource.manager.transaction(async (manager) => {
      const voteRepo = manager.getRepository(VoteEntity);
      const programRepo = manager.getRepository(ProgramEntity);

      await voteRepo.save({
        userId: create.user.id,
        planId: create.plan.id,
        programId: create.programId,
        date: create.date,
      });

      await programRepo.update(
        { id: create.programId },
        { votedCount: () => "votedCount + 1" }
      );
    });
  }
  async getVote(
    get: GetVote
  ): Promise<{ _tag: "vote"; data: Vote } | NoVoteForPlan> {
    const {
      user: { id },
      planId,
    } = get;
    const vote = await this.voteRepo.findOneBy({ userId: id, planId });

    return vote
      ? { _tag: "vote", data: vote }
      : { _tag: "No_Vote", planId, userId: id };
  }

  async deleteVote(vote: Vote): Promise<NoVoteForPlan> {
    await this.dataSource.manager.transaction(async (manager) => {
      const programRepo = manager.getRepository(ProgramEntity);
      const voteRepo = manager.getRepository(VoteEntity);

      voteRepo.delete({ planId: vote.planId });

      programRepo.update(
        { id: vote.programId },
        {
          votedCount() {
            return "votedCout - 1";
          },
        }
      );
    });

    return { _tag: "No_Vote", planId: vote.planId, userId: vote.userId };
  }
}
