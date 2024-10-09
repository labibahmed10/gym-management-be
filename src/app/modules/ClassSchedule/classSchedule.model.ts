import { model, Schema } from "mongoose";
import { ISchedule } from "./classSchedule.interface";
import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { parseISO } from "date-fns";

const scheduleSchema = new Schema<ISchedule>(
  {
    date: {
      type: String,
      required: [true, "Class Schedule date is required"],
    },
    startTime: {
      type: String,
      required: [true, "Start time is required"],
      validate: {
        validator: function (v: string) {
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
        },
        message: (props: { value: any }) => `${props.value} is not a valid time format (HH:MM)!`,
      },
    },
    endTime: {
      type: String,
      required: [true, "End time is required"],
      validate: {
        validator: function (v: string) {
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
        },
        message: (props: { value: any }) => `${props.value} is not a valid time format (HH:MM)!`,
      },
    },
    trainer: {
      type: Schema.Types.ObjectId,
      ref: "Trainer",
      required: [true, "Trainer is required"],
    },
    maxTrainees: {
      type: Number,
      required: true,
      default: 10,
      validate: {
        validator: function (v: number) {
          return v <= 10;
        },
        message: "Maximum number of trainees is 10.",
      },
    },
    bookedTrainees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

scheduleSchema.pre("save", async function (next) {
  const scheduleCountADay = await ScheduleModel.countDocuments({
    date: this.date,
  });
  if (scheduleCountADay >= 5) {
    throw new AppError(httpStatus.BAD_REQUEST, "Class Schedule is full for today");
  }

  const startDateTime = parseISO(`${this.date}T${this.startTime}`);
  const endDateTime = parseISO(`${this.date}T${this.endTime}`);
  const durationInHours = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);

  if (durationInHours !== 2) {
    throw new Error("Schedule duration must be exactly 2 hours");
  }

  const overlappingSchedule = await ScheduleModel.findOne({
    date: this.date,
    $or: [
      { startTime: { $lt: this.endTime }, endTime: { $gt: this.startTime } },
      { startTime: { $gte: this.startTime, $lt: this.endTime } },
      { endTime: { $gt: this.startTime, $lte: this.endTime } },
    ],
  });

  if (overlappingSchedule) {
    throw new AppError(httpStatus.BAD_REQUEST, "Class schedule overlaps with existing schedule");
  }

  // Ensure booked trainees do not exceed maxTrainees
  if (this.bookedTrainees.length > this.maxTrainees) {
    throw new AppError(httpStatus.BAD_REQUEST, "Class is already fully booked. Max 10 trainees.");
  }

  next();
});



const ScheduleModel = model<ISchedule>("Schedule", scheduleSchema);

export default ScheduleModel;
