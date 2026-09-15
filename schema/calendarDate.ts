import { z } from "zod";

// Chakra date picker emits a calendar date (YYYY-MM-DD); widen it to the ISO datetime
export const CalendarDateSchema = (label: string) =>
  z
    .string({ error: `${label} is required` })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { error: `${label} is required` })
    .transform((date) => `${date}T00:00:00.000Z`);
