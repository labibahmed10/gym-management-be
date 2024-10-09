import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import { BookingService } from "./booking.service";

const createBooking = catchAsyncFunc(async (req, res) => {
  const booking = await BookingService.createBookingIntoDB(req.body);
  sendResponse(res, httpStatus.CREATED, "Booking created successfully", booking);
});

export const BookingController = {
  createBooking,
};
