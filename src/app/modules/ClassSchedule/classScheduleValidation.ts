import { z } from "zod";

const createScheduleZodSchema = z.object({
  body: z.object({
    trainer: z.string(),
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
  }),
});

const updateScheduleZodSchema = z.object({
  body: z.object({
    trainer: z.string().optional(),
    date: z.string().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    bookedTrainees: z.array(z.string()).optional(),
    maxTrainees: z.number().optional(),
  }),
});

export const ClassScheduleValidation = {
  createScheduleZodSchema,
  updateScheduleZodSchema,
};
