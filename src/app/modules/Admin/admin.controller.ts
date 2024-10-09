import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import { AdminService } from "./admin.service";

const getAllTrainers = catchAsyncFunc(async (req, res) => {
  const trainers = await AdminService.getAllTrainersFromDB();
  sendResponse(res, httpStatus.OK, "Trainers fetched successfully", trainers);
});

const createTrainer = catchAsyncFunc(async (req, res) => {
  const trainer = await AdminService.createTrainerIntoDB(req.body);

  sendResponse(res, httpStatus.CREATED, "Trainer created successfully", trainer);
});

const updateTrainer = catchAsyncFunc(async (req, res) => {
  const trainer = await AdminService.updateTrainerIntoDB(req.params.id, req.body);
  sendResponse(res, httpStatus.OK, "Trainer updated successfully", trainer);
});

const deleteTrainer = catchAsyncFunc(async (req, res) => {
  const trainer = await AdminService.deleteTrainerFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, "Trainer deleted successfully", trainer);
});

export const AdminController = {
  getAllTrainers,
  createTrainer,
  updateTrainer,
  deleteTrainer,
};
