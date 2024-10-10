import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import { BookingService } from "./booking.service";

const createBooking = catchAsyncFunc(async (req, res) => {
  const booking = await BookingService.createBookingIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, "Booking created successfully", booking);
});

const getBookingsByTrainee = catchAsyncFunc(async (req, res) => {
  const traineeId = req.user.userId;
  const bookings = await BookingService.getBookingsByTrainee(traineeId);
  sendResponse(res, httpStatus.OK, "Bookings fetched successfully", bookings);
});

const cancelBookingByTrainee = catchAsyncFunc(async (req, res) => {
  const bookingId = req.params.id;
  const booking = await BookingService.cancelBookingByTrainee(bookingId);
  sendResponse(res, httpStatus.OK, "Booking cancelled successfully", booking);
});

export const BookingController = {
  createBooking,
  getBookingsByTrainee,
  cancelBookingByTrainee,
};
