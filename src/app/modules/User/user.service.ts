import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { IUser } from "./user.interface";
import UserModel from "./user.model";
import createToken from "../../utils/createToken";
import config from "../../config/config";

const registerUserIntoDB = async (userData: IUser) => {
  const user = await UserModel.create(userData);
  return user;
};

const loginUserIntoDB = async (userData: IUser) => {
  const user = await UserModel.isUserExistByEmail(userData.email as string);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "No user exist");
  }
  const isPasswordMatched = await UserModel.isPasswordMatched(userData.password, user.password);
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  const payload = {
    id: user._id,
    role: user.role,
    email: user.email,
  };

  const token = createToken(payload, config.jwt_access_secret as string, config.access_token_expires_in as string);

  return {
    user,
    token,
  };
};

export const UserServices = {
  registerUserIntoDB,
  loginUserIntoDB,
};
