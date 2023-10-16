import { error } from "console";
import { Plan, plans } from "../../routes/plan.route";
import { User } from "../../routes/user.route";
import {
  ForbiddenError,
  HttpError,
  NotFoundError,
} from "../../utility/http-error";
import { CreateProgramDto } from "./dto/create-program.dto";

export function createProgram(
  { planId, title, description }: CreateProgramDto,
  user: User
) {
  const plan = plans.find((planItem) => planItem.id === planId);
  if (plan === undefined) {
    throw new NotFoundError();
  }
  if (canCreateProgram(user, plan)) {
    plan.programs.push({
      id: plan.programs.length + 1,
      title,
      planId,
      description,
      userId: user.id,
    });
  } else {
    throw new HttpError(400, "program is not valid");
  }
}

export const canCreateProgram = (user: User, plan: Plan) => {
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
};
