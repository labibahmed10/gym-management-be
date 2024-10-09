import { ISchedule } from "./classSchedule.interface";
import ScheduleModel from "./classSchedule.model";

const createScheduleIntoDB = async (payload: ISchedule) => {
  const schedule = await ScheduleModel.create(payload);
  return schedule;
};

const getAllSchedulesFromDB = async () => {
  const schedules = await ScheduleModel.find({});
  return schedules;
};

export const ClassScheduleService = {
  createScheduleIntoDB,
  getAllSchedulesFromDB,
};
