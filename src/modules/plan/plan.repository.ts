import { Repository } from "typeorm";
import { Plan } from "./model/plan";
import { Program } from "./program/model/program";
import { AppDataSource } from "../../utility/data-source";
import { PlanEntity } from "./enitty/plan.entity";

export interface CreatePlan {
  title: string;
  description: string;
  deadLine: Date;
  programs: Program[];
}

export interface createProgram {
  title: string;
  description: string;
  userId: string;
}

export class PlanRepository {
  private planRepo: Repository<PlanEntity>;

  constructor() {
    this.planRepo = AppDataSource.getRepository(PlanEntity);
  }

  public create(plan: CreatePlan): Promise<Plan> {
    return this.planRepo.save(plan);
  }
  public findById(id: number): Promise<Plan | null> {
    return this.planRepo.findOne({
      where: { id },
      relations: ["programs"],
    });
  }

  public addProgram(plan: Plan, program: createProgram): Promise<Plan> {
    return this.planRepo.save({
      ...plan,
      programs: [...plan.programs, program],
    });
  }
}
