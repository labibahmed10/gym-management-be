import { Router } from "express";
import { isTrainee } from "../../middleware/authCheck";
import { BookingController } from "./booking.controller";
import validateRequest from "../../middleware/validateRequest";
import { BookingValidation } from "./booking.validation";

const BookingRoute = Router();

BookingRoute.post("/", isTrainee, validateRequest(BookingValidation.bookingCreateSchema), BookingController.createBooking);

BookingRoute.get("/trainee", isTrainee, BookingController.getBookingsByTrainee);

BookingRoute.delete("/cancel/:id", isTrainee, BookingController.cancelBookingByTrainee);

export default BookingRoute;
