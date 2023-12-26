import { NonEmptyString } from "../../../../data/non-empty-string";
import { UserRepresentative } from "../../../user/model/user";
import { FuturePlan, Plan } from "../../model/plan";

export class CreateProgram {
  private constructor(
    public user: UserRepresentative,
    public program: { title: NonEmptyString; description: string },
    public plan: FuturePlan
  ) {}

  public static create(
    user: UserRepresentative,
    program: { title: NonEmptyString; description: string },
    plan: FuturePlan
  ) {
    const existingProgram = plan.programs.find((x) => x.userId === user.id);

    if (existingProgram) {
      return undefined;
    }

    return new CreateProgram(user, program, plan);
  }

  public getPlanWithProgram() {
    return {
      ...this.plan,
      programs: [
        ...this.plan.programs,
        { ...this.program, userId: this.user.id },
      ],
    };
  }
}
