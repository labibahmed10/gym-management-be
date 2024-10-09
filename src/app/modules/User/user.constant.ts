import { TUserRole } from "./user.interface";

export const userRole = {
  admin: "admin",
  trainer: "trainer",
  trainee: "trainee",
} as const;

export const Role: TUserRole[] = ["admin", "trainer", "trainee"];

export const UserStatus = ["active", "blocked"];
