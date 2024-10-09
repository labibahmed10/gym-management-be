import { model, Schema } from "mongoose";
import { ITrainer } from "./trainer.interface";

const trainerSchema = new Schema<ITrainer>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      unique: true,
    },
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
    },
    experience: {
      type: Number,
      required: [true, "Experience is required"],
    },
    assignedSchedules: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const TrainerModel = model<ITrainer>("Trainer", trainerSchema);

export default TrainerModel;
