import httpStatus from "http-status";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponse from "../../utils/sendResponse";
import { ClassScheduleService } from "./classSchedule.service";

const createSchedule = catchAsyncFunc(async (req, res) => {
  const schedule = await ClassScheduleService.createScheduleIntoDB(req.body);

  sendResponse(res, httpStatus.CREATED, "Schedule created successfully", schedule);
});

const getAllSchedules = catchAsyncFunc(async (req, res) => {
  const schedules = await ClassScheduleService.getAllSchedulesFromDB();
  sendResponse(res, httpStatus.OK, "Schedules fetched successfully", schedules);
});

const getScheduleById = catchAsyncFunc(async (req, res) => {
  const schedule = await ClassScheduleService.getScheduleByIdFromDB(req.params.id);
  sendResponse(res, httpStatus.OK, "Schedule fetched successfully", schedule);
});

const updateScheduleById = catchAsyncFunc(async (req, res) => {
  const schedule = await ClassScheduleService.updateScheduleByIdFromDB(req.params.id, req.body);
  sendResponse(res, httpStatus.OK, "Schedule updated successfully", schedule);
});

export const ClassScheduleController = {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateScheduleById,
};
