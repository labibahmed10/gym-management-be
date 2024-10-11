import { Model } from "mongoose";
import { userRole } from "./user.constant";

export type TUserStatus = "active" | "blocked";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  role: TUserRole;
  password: string;
  status: TUserStatus;
  phone?: string;
}

export interface ILogin {
  email: string;
  password: string;
}

// user static model interface
export interface IUserModel extends Model<IUser> {
  isUserExistById(id: string): Promise<IUser | null>;
  isUserExistByEmail(email: string): Promise<IUser | null>;
  isPasswordMatched(plainPassword: string, hashedPassword: string): Promise<boolean>;
}

// user role type
export type TUserRole = keyof typeof userRole;
