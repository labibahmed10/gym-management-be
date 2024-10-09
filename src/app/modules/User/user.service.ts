import { IUser } from "./user.interface";
import UserModel from "./user.model";

const registerUserIntoDB = async (userData: IUser) => {
  const user = await UserModel.create(userData);
  return user;
};

export const UserServices = {
  registerUserIntoDB,
};
