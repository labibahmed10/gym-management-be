import catchAsyncFunc from "../../utils/catchAsyncFunc";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const registerUser = catchAsyncFunc(async (req, res) => {
  const { ...userData } = req.body;
  const result = await UserServices.registerUserIntoDB(userData);

  sendResponse(res, httpStatus.CREATED, "User registered successfully", result);
});

const loginUser = catchAsyncFunc(async (req, res) => {
  const { ...userData } = req.body;
  const result = await UserServices.loginUserIntoDB(userData);

  sendResponse(res, httpStatus.CREATED, "User registered successfully", result);
});

export const UserController = {
  registerUser,
  loginUser,
};
