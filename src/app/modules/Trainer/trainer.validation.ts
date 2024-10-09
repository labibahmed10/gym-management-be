import { z } from "zod";

const TrainerCreateValidation = z.object({
  body: z.object({
    userId: z.string(),
    name: z.string({
      required_error: "Name is required",
    }),
    specialization: z.string({
      required_error: "Specialization is required",
    }),
    experience: z.number({
      required_error: "Experience is required",
    }),
    assignedSchedules: z.array(z.string()),
  }),
});
