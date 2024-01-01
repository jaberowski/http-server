import { isFutureDate } from "../../data/future-date";
import { NonEmptyString } from "../../data/non-empty-string";
import {
  ForbiddenError,
  HttpError,
  NotFoundError,
} from "../../utility/http-error";
import {
  User,
  UserRepresentative,
  isAdminUser,
  isRepresentative,
} from "../user/model/user";
import { CreatePlanDto } from "./dto/create-plan.dto";
import { FuturePlan, Plan, isFuturePlan } from "./model/plan";
import { PlanId } from "./model/plan-id";
import { CreatePlan, IPlanRepository, PlanRepository } from "./plan.repository";
import { CreateProgramDto } from "./program/dto/create-program.dto";
import { CreateProgram } from "./program/model/create-program";
import { Program } from "./program/model/program";

export class PlanService {
  constructor(private planRepo: IPlanRepository) {}

  async getPlanById(planId: PlanId) {
    const plan = await this.planRepo.findById(planId);

    if (!plan) {
      throw new HttpError(404, "plan not found");
    }
    return plan;
  }

  createPlan(dto: CreatePlanDto, loggedInUser: User) {
    if (!isFutureDate(dto.deadLineProgram)) {
      throw new HttpError(400, "dead line should be in the future");
    }
    if (!isAdminUser(loggedInUser)) {
      throw new HttpError(403, "you are not authorized");
    }
    if (!isFutureDate(dto.deadLineVote)) {
      throw new HttpError(400, "dead line should be in the future");
    }

    const plan: CreatePlan = {
      user: loggedInUser,
      data: {
        title: dto.title,
        description: dto.description || "",
        deadLineProgram: dto.deadLineProgram,
        deadLineVote: dto.deadLineVote,
        programs: [],
      },
    };

    return this.planRepo.create(plan);
  }

  async createProgram(
    { planId, title, description }: CreateProgramDto,
    user: User
  ): Promise<Plan> {
    const plan = await this.planRepo.findById(planId);

    if (!plan) throw new NotFoundError();

    if (!isRepresentative(user)) {
      throw new ForbiddenError();
    }
    if (!isFuturePlan(plan)) {
      throw new HttpError(400, "plan is in the past");
    }

    const createProgram = CreateProgram.create(
      user,
      {
        title,
        description: description || "",
      },
      plan
    );

    if (!createProgram) {
      throw new HttpError(400, "this user have another plan");
    }
    return this.planRepo.addProgram(createProgram);
  }
}
