import httpStatus from "http-status";
import AppError from "../../error/AppError";
import TrainerModel from "../Trainer/trainer.model";
import { ISchedule } from "./classSchedule.interface";
import ScheduleModel from "./classSchedule.model";
import { parseISO } from "date-fns";

const createScheduleIntoDB = async (payload: ISchedule) => {
  const schedule = await ScheduleModel.create(payload);
  return schedule;
};

const getAllSchedulesFromDB = async () => {
  const schedules = await ScheduleModel.find({});
  return schedules;
};

const getScheduleByIdFromDB = async (id: string) => {
  const schedule = await ScheduleModel.findById(id);
  return schedule;
};

const updateScheduleByIdFromDB = async (id: string, payload: Partial<ISchedule>) => {
  const scheduleClass = await ScheduleModel.findById(id);
  if (!scheduleClass) {
    throw new AppError(httpStatus.NOT_FOUND, "Schedule not found");
  }

  if (payload.trainer) {
    const trainerExist = await TrainerModel.findOne({ _id: payload?.trainer });
    if (!trainerExist) {
      throw new AppError(httpStatus.NOT_FOUND, "Trainer not found");
    }
  }

  if (payload.startTime || payload.endTime) {
    const startDateTime = parseISO(`${payload.date || scheduleClass.date}T${payload.startTime || scheduleClass.startTime}`);
    const endDateTime = parseISO(`${payload.date || scheduleClass.date}T${scheduleClass.endTime}`);
    const durationInHours = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);

    if (durationInHours !== 2) {
      throw new Error("Schedule duration must be exactly 2 hours");
    }
  }

  const schedule = await ScheduleModel.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

  return schedule;
};

const deleteScheduleByIdFromDB = async (id: string) => {
  const schedule = await ScheduleModel.findByIdAndDelete(id);
  return schedule;
};

export const ClassScheduleService = {
  createScheduleIntoDB,
  getAllSchedulesFromDB,
  getScheduleByIdFromDB,
  updateScheduleByIdFromDB,
  deleteScheduleByIdFromDB,
};
