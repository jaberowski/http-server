import { Plan, plans } from "../routes/plan.route";
import { HttpError } from "../utility/my-error";

export const getPlanById = (id: number): Plan => {
  const plan = plans.find((planItem) => planItem.id === id);

  if (plan === undefined) {
    throw new HttpError(400, "plan not found");
  }
  return plan;
};
