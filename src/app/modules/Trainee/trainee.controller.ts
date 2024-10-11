import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import { TraineeService } from "./trainee.service";

const getProfile = catchAsyncFunc(async (req, res) => {
  const user = req.user;
  const trainee = await TraineeService.getProfileFromDB(user._id);
  sendResponse(res, httpStatus.OK, "Profile fetched successfully", trainee);
});


const updateProfile = catchAsyncFunc(async (req, res) => {
  const trainee = await TraineeService.updateProfileIntoDB(req.body);
  sendResponse(res, httpStatus.OK, "Profile updated successfully", trainee);
});

export const TraineeController = {
  getProfile,
  updateProfile,
};
