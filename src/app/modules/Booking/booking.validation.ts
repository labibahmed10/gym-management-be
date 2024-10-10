import { z } from "zod";

const bookingCreateSchema = z.object({
  body: z.object({
    traineeId: z.string(),
    scheduleId: z.string(),
    bookingDate: z.string(),
  }),
});

export const BookingValidation = {
  bookingCreateSchema,
};
