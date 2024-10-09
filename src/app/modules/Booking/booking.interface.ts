import { Schema } from "mongoose";

export interface IBooking {
  scheduleId: Schema.Types.ObjectId;
  traineeId: Schema.Types.ObjectId;
  status: "confirmed" | "cancelled";
}
