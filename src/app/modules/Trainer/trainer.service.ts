import { ITrainer } from "../Trainer/trainer.interface";
import TrainerModel from "../Trainer/trainer.model";
import UserModel from "../User/user.model";
import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { userRole } from "../User/user.constant";

const getAllTrainersFromDB = async () => {
  const trainers = await TrainerModel.find({}).populate("userId");
  return trainers;
};

const createTrainerIntoDB = async (payload: ITrainer) => {
  const user = await UserModel.isUserExistById(String(payload.userId));
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  await UserModel.findByIdAndUpdate(payload.userId, { role: userRole.trainer });
  const trainer = await TrainerModel.create(payload);
  return trainer;
};

const updateTrainerIntoDB = async (id: string, payload: Partial<ITrainer>) => {
  const trainer = await TrainerModel.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
  return trainer;
};

const deleteTrainerFromDB = async (id: string) => {
  const trainer = await TrainerModel.findByIdAndDelete(id);
  return trainer;
};

export const TrainerService = {
  getAllTrainersFromDB,
  createTrainerIntoDB,
  updateTrainerIntoDB,
  deleteTrainerFromDB,
};
