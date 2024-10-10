import { Schema } from "mongoose";

export interface IBooking {
  scheduleId: Schema.Types.ObjectId;
  traineeId: Schema.Types.ObjectId;
  bookingDate: string;
  status: "confirmed" | "cancelled";
}
