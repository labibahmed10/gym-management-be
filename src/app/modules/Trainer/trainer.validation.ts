import { z } from "zod";

const TrainerCreateValidation = z.object({
  body: z.object({
    userId: z.string(),

    specialization: z.string({
      required_error: "Specialization is required",
    }),
    experience: z.number({
      required_error: "Experience is required",
    }),
    assignedSchedules: z.array(z.string()),
  }),
});

const TrainerUpdateValidation = z.object({
  body: z.object({
    specialization: z.string().optional(),
    experience: z.number().optional(),
    assignedSchedules: z.array(z.string()).optional(),
  }),
});

export const TrainerValidation = {
  TrainerCreateValidation,
  TrainerUpdateValidation,
};
