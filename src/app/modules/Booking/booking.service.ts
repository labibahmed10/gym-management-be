import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { IBooking } from "./booking.interface";
import BookingModel from "./booking.model";
import ClassScheduleModel from "../ClassSchedule/classSchedule.model"; // Assuming you have a ClassSchedule model

const createBookingIntoDB = async (payload: IBooking) => {
  // Find the schedule to get its time slot
  const schedule = await ClassScheduleModel.findById(payload.scheduleId);
  if (!schedule) {
    throw new AppError(httpStatus.NOT_FOUND, "Schedule not found");
  }

  // Check for existing bookings in the same time slot for the same trainee
  const existingBooking = await BookingModel.findOne({
    traineeId: payload.traineeId,
    scheduleId: payload.scheduleId,
    status: "confirmed", // Only check confirmed bookings
  });

  if (existingBooking) {
    throw new AppError(httpStatus.BAD_REQUEST, "You already have a booking for this time slot");
  }

  // Check if the schedule has available slots
  const bookingsCount = await BookingModel.countDocuments({ scheduleId: payload.scheduleId, status: "confirmed" });
  if (bookingsCount >= 10) {
    throw new AppError(httpStatus.BAD_REQUEST, "No available slots for this schedule");
  }

  // Create the booking
  const booking = await BookingModel.create(payload);
  return booking;
};

export const BookingService = {
  createBookingIntoDB,
};
