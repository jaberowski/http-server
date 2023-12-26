import { z } from "zod";
import { Brand } from "../../../utility/brand";
import { v4 } from "uuid";

export type UserId = Brand<string, "userId">;

export const isUserId = (value: string): value is UserId => {
  return true;
};

export const zodUserId = z.string().refine(isUserId);

export const generateUserId = () => v4() as UserId;
