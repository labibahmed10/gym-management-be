import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import { TrainerService } from "./trainer.service";

const getAllTrainers = catchAsyncFunc(async (req, res) => {
  const trainers = await TrainerService.getAllTrainersFromDB();
  sendResponse(res, httpStatus.OK, "Trainers fetched successfully", trainers);
});

const createTrainer = catchAsyncFunc(async (req, res) => {
  const trainer = await TrainerService.createTrainerIntoDB(req.body);

  sendResponse(res, httpStatus.CREATED, "Trainer created successfully", trainer);
});

const updateTrainer = catchAsyncFunc(async (req, res) => {
  const trainer = await TrainerService.updateTrainerIntoDB(req.params.id, req.body);
  sendResponse(res, httpStatus.OK, "Trainer updated successfully", trainer);
});

const deleteTrainer = catchAsyncFunc(async (req, res) => {
  const trainer = await TrainerService.deleteTrainerFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, "Trainer deleted successfully", trainer);
});

export const TrainerController = {
  getAllTrainers,
  createTrainer,
  updateTrainer,
  deleteTrainer,
};
