import { z } from "zod";

const bookingCreateSchema = z.object({
  body: z.object({
    traineeId: z.string().optional(),
    scheduleId: z.string().optional(),
  }),
});

export const BookingValidation = {
  bookingCreateSchema,
};
