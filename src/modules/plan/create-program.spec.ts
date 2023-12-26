// import { loginAdminTest, loginRepesentorTest } from "../../../e2e/utility";
// import { NonEmptyString } from "../../data/non-empty-string";
// import { ForbiddenError } from "../../utility/http-error";
// import { UserId, generateUserId } from "../user/model/user-id";
// import { Plan } from "./model/plan";
// import { PlanId } from "./model/plan-id";
// import { CreatePlan, CreateProgram, IPlanRepository } from "./plan.repository";
// import { PlanService } from "./plan.service";
// import { ProgramId } from "./program/model/program-id";

// class MockPlanRepo implements IPlanRepository {
//   create(plan: CreatePlan): Promise<Plan> {
//     throw new Error("Method not implemented.");
//   }
//   findById(id: number): Promise<Plan | null> {
//     throw new Error("Method not implemented.");
//   }
//   addProgram(plan: Plan, program: CreateProgram): Promise<Plan> {
//     throw new Error("Method not implemented.");
//   }
// }

// describe("unit test", () => {
//   let planService: PlanService;

//   beforeEach(() => {
//     planService = new PlanService(new MockPlanRepo());
//   });

//   it("it should not create program if user is not reprens", async () => {
//     // const user = await loginAdminTest();
//     expect(() =>
//       planService.canCreateProgram(
//         {
//           username: "foo",
//           password: "bar",
//           role: "Normal",
//           id: generateUserId(),
//         },
//         {
//           id: 1 as PlanId,
//           title: "jds" as NonEmptyString,
//           programs: [],
//           deadLine: new Date(),
//           description: "sdk",
//         }
//       )
//     ).toThrowError(ForbiddenError);
//   });
//   it("should not create program if user already have a program", async () => {
//     const generatedUserId = generateUserId();
//     // const user = await loginRepesentorTest();
//     expect(
//       planService.canCreateProgram(
//         {
//           username: "foo",
//           password: "bar",
//           id: generatedUserId,
//           role: "Representative",
//         },
//         {
//           id: 1 as PlanId,
//           title: "oromie" as NonEmptyString,
//           programs: [
//             {
//               id: 1 as ProgramId,
//               planId: 1 as PlanId,
//               title: "recreate" as NonEmptyString,
//               userId: generatedUserId,
//               description: "dksua",
//             },
//           ],
//           deadLine: new Date(),
//           description: "hey",
//         }
//       )
//     ).toBe(false);
//   });

//   it("should  not create program if plan deadline exceed from today", async () => {
//     // const user = await loginRepesentorTest();
//     const today = new Date();
//     const yesterday = new Date(today.setDate(today.getDate() - 1));
//     expect(
//       planService.canCreateProgram(
//         {
//           username: "foo",
//           password: "bar",
//           id: generateUserId(),
//           role: "Representative",
//         },
//         {
//           id: 1 as PlanId,
//           title: "oromie" as NonEmptyString,
//           programs: [],
//           deadLine: yesterday,
//           description: "hey",
//         }
//       )
//     ).toBe(false);
//   });
//   it("should create program", async () => {
//     // const user = await loginRepesentorTest();
//     const today = new Date();
//     const tomorow = new Date(today.setDate(today.getDate() + 1));
//     expect(
//       planService.canCreateProgram(
//         {
//           username: "foo",
//           password: "bar",
//           id: generateUserId(),
//           role: "Representative",
//         },
//         {
//           id: 1 as PlanId,
//           title: "oromie" as NonEmptyString,
//           programs: [],
//           deadLine: tomorow,
//           description: "hey",
//         }
//       )
//     ).toBe(true);
//   });
// });
