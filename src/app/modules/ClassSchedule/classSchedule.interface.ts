import { Schema } from "mongoose";

export interface ISchedule {
  trainer: Schema.Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  bookedTrainees: string[];
  maxTrainees: number;
}
