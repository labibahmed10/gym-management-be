import { Types } from "mongoose";

export interface ITrainer {
  userId: Types.ObjectId;
  name: string;
  specialization: string;
  experience: number;
  assignedSchedules: string[];
}
