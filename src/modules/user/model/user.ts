import { UserId } from "./user-id";

export type UserRole = "Admin" | "Representative" | "Normal";

export interface User {
  id: UserId;
  username: string;
  password: string;
  role: UserRole;
}

export interface UserRepresentative extends User {
  role: "Representative";
}

export const isRepresentative = (user: User): user is UserRepresentative => {
  return user.role === "Representative";
};

export interface UserAdmin extends User {
  role: "Admin";
}

export const isAdminUser = (user: User): user is UserAdmin =>
  user.role === "Admin";
