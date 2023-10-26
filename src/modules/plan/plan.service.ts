import {
  ForbiddenError,
  HttpError,
  NotFoundError,
} from "../../utility/http-error";
import { User } from "../user/model/user";
import { Plan } from "./model/plan";
import { CreatePlan, PlanRepository } from "./plan.repository";
import { CreateProgramDto } from "./program/dto/create-program.dto";
import { Program } from "./program/model/program";

export class PlanService {
  private planRepo: PlanRepository;
  constructor() {
    this.planRepo = new PlanRepository();
  }

  getPlanById(planId: number) {
    const plan = this.planRepo.findById(planId);

    if (plan === undefined) {
      throw new HttpError(404, "plan not found");
    }
    return plan;
  }

  createPlan(
    dto: {
      title: string;
      description?: string;
      deadLine: Date;
    },
    loggedInUser: User
  ) {
    const plan: CreatePlan = {
      title: dto.title,
      description: dto.description || "",
      deadLine: dto.deadLine,
      programs: [],
    };

    if (dto.deadLine.getTime() < new Date().getTime()) {
      throw new HttpError(400, "dead line should be in the future");
    }
    if (loggedInUser.role !== "Admin") {
      throw new HttpError(403, "you are not authorized");
    }

    return this.planRepo.create(plan);
  }

  createProgram(
    { planId, title, description }: CreateProgramDto,
    user: User
  ): Program {
    const plan = this.planRepo.findById(planId);
    if (plan === undefined) {
      throw new NotFoundError();
    }
    if (this.canCreateProgram(user, plan)) {
      return this.planRepo.addProgram(plan, {
        userId: user.id,
        description: description || "",
        title: title,
      });
    } else {
      throw new HttpError(400, "program is not valid");
    }
  }

  canCreateProgram(user: User, plan: Plan) {
    if (user.role !== "Representative") {
      throw new ForbiddenError();
    }

    const existingProgram = plan.programs.find(
      (programItem) => programItem.userId === user.id
    );

    if (existingProgram) {
      return false;
    }
    if (plan.deadLine.getTime() < new Date().getTime()) {
      return false;
    }
    return true;
  }
}
