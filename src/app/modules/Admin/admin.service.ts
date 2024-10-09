import { ITrainer } from "../Trainer/trainer.interface";
import TrainerModel from "../Trainer/trainer.model";

const createTrainerIntoDB = async (payload: ITrainer) => {
  const trainer = await TrainerModel.create(payload);
  return trainer;
};

export const AdminService = {
  createTrainerIntoDB,
};
