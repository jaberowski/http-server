import { loginAdminTest, loginRepesentorTest } from "../../../e2e/utility";
import { ForbiddenError } from "../../utility/http-error";
import { canCreateProgram, createProgram } from "./create-program";

describe("unit test", () => {
  it("it should not create program if user is not reprens", async () => {
    const user = await loginAdminTest();
    expect(() =>
      canCreateProgram(user, {
        id: 1,
        title: "jds",
        programs: [],
        deadLine: new Date(),
        description: "sdk",
      })
    ).toThrowError(ForbiddenError);
  });
  it("should not create program if user already have a program", async () => {
    const user = await loginRepesentorTest();
    expect(
      canCreateProgram(user, {
        id: 1,
        title: "oromie",
        programs: [
          {
            id: 1,
            planId: 1,
            title: "recreate",
            userId: user.id,
            description: "dksua",
          },
        ],
        deadLine: new Date(),
        description: "hey",
      })
    ).toBe(false);
  });

  it("should  not create program if plan deadline exceed from today", async () => {
    const user = await loginRepesentorTest();
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1));
    expect(
      canCreateProgram(user, {
        id: 1,
        title: "oromie",
        programs: [],
        deadLine: yesterday,
        description: "hey",
      })
    ).toBe(false);
  });
  it("should create program", async () => {
    const user = await loginRepesentorTest();
    const today = new Date();
    const tomorow = new Date(today.setDate(today.getDate() + 1));
    expect(
      canCreateProgram(user, {
        id: 1,
        title: "oromie",
        programs: [],
        deadLine: tomorow,
        description: "hey",
      })
    ).toBe(true);
  });
});
