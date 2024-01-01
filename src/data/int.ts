import { Brand } from "../utility/brand";

export type Integer = Brand<number, "integer">;

export const isInteger = (num: number): num is Integer => {
  return Number.isInteger(num);
};

export type WholeNumber = Brand<Integer, "WholeNumber">;

export const isWholeNumber = (num: number): num is WholeNumber => {
  return isInteger(num) && num >= 0;
};
