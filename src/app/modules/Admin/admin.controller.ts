import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import { AdminService } from "./admin.service";

const createTrainer = catchAsyncFunc(async (req, res) => {
  const trainer = await AdminService.createTrainerIntoDB(req.body);

  sendResponse(res, httpStatus.CREATED, "Trainer created successfully", trainer);
});

export const AdminController = {
  createTrainer,
  //   updateTrainer,
  //   deleteTrainer,
};
