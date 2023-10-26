import { Plan } from "./model/plan";
import { Program } from "./program/model/program";

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
  private plans: Plan[] = [];
  private getNextId() {
    return this.plans.length + 1;
  }
  public create(plan: CreatePlan) {
    const createdPlan = { ...plan, id: this.getNextId() };
    this.plans.push(createdPlan);
    return createdPlan;
  }
  public findById(id: number) {
    return this.plans.find((planItem) => planItem.id === id);
  }

  public addProgram(plan: Plan, program: createProgram) {
    const createdProgram = {
      id: plan.programs.length + 1,
      title: program.title,
      planId: plan.id,
      description: program.description || "",
      userId: program.userId,
    };
    plan.programs.push(createdProgram);
    return createdProgram;
  }
}
