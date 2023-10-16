import { Plan, plans } from "../../routes/plan.route";
import { User } from "../../routes/user.route";
import { HttpError } from "../../utility/http-error";

export const createPlan = (
  dto: {
    title: string;
    description?: string;
    deadLine: Date;
  },
  loggedInUser: User
) => {
  const plan: Plan = {
    id: plans.length + 1,
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
  plans.push(plan);
  return plan;
};
