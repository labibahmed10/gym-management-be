import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { IBooking } from "./booking.interface";
import BookingModel from "./booking.model";
import ClassScheduleModel from "../ClassSchedule/classSchedule.model";

const createBookingIntoDB = async (payload: IBooking) => {
  const schedule = await ClassScheduleModel.findById(payload.scheduleId);
  if (!schedule) {
    throw new AppError(httpStatus.NOT_FOUND, "Schedule not found");
  }

  if (schedule.date === payload.bookingDate) {
    if (schedule.bookedTrainees.includes(payload.traineeId.toString())) {
      throw new AppError(httpStatus.CONFLICT, "You have a slot at the same time.");
    }

    await ClassScheduleModel.findByIdAndUpdate(
      payload.scheduleId,
      {
        $addToSet: { bookedTrainees: payload.traineeId },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  const newBooking = await BookingModel.create(payload);
  return newBooking;
};

export const BookingService = {
  createBookingIntoDB,
};
