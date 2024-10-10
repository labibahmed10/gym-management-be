import { model, Schema } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>(
  {
    traineeId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Trainee is required"],
    },
    scheduleId: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
      required: [true, "Class Schedule is required"],
    },
    bookingDate: {
      type: String,
      required: [true, "Booking date is required"],
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const BookingModel = model<IBooking>("Booking", bookingSchema);

export default BookingModel;
