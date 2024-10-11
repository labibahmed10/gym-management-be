import { IUser } from "../User/user.interface";
import UserModel from "../User/user.model";

const getProfileFromDB = async (id: string) => {
  const user = await UserModel.findById(id);
  return user;
};

const updateProfileIntoDB = async (payload: Partial<IUser>) => {
  const user = await UserModel.findByIdAndUpdate(payload._id, payload, { new: true });
  return user;
};

export const TraineeService = {
  getProfileFromDB,
  updateProfileIntoDB,
};
