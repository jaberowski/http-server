import { DataSource, Repository } from "typeorm";
import { Plan } from "./model/plan";
import { Program } from "./program/model/program";
import { PlanEntity } from "./enitty/plan.entity";
import { CreateProgramDto } from "./program/dto/create-program.dto";
import { NonEmptyString } from "../../data/non-empty-string";
import { PlanId } from "./model/plan-id";
import { CreateProgram } from "./program/model/create-program";
import { UserAdmin } from "../user/model/user";
import { FutureDate } from "../../data/future-date";

export interface IPlanRepository {
  create(plan: CreatePlan): Promise<Plan>;
  findById(id: PlanId): Promise<Plan | null>;
  addProgram(program: CreateProgram): Promise<Plan>;
}

export interface CreatePlan {
  user: UserAdmin;
  data: {
    title: NonEmptyString;
    description: string;
    deadLineProgram: FutureDate;
    deadLineVote: FutureDate;
    programs: Program[];
  };
}

export class PlanRepository implements IPlanRepository {
  private planRepo: Repository<PlanEntity>;

  constructor(appDataSource: DataSource) {
    this.planRepo = appDataSource.getRepository(PlanEntity);
    this.planRepo.count().then((x) => console.log(x));
  }

  public create(plan: CreatePlan): Promise<Plan> {
    return this.planRepo.save(plan.data);
  }
  public findById(id: PlanId): Promise<Plan | null> {
    return this.planRepo.findOne({
      where: { id },
      relations: ["programs"],
    });
  }

  public addProgram(createProgram: CreateProgram): Promise<Plan> {
    return this.planRepo.save(createProgram.getPlanWithProgram());
  }
}
