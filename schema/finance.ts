import { z } from "zod";

// Get Summary
export const GetFinanceSummaryQuerySchema = z.object({
  teamId: z.cuid2().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
});

export const GetFinanceSummaryOutputSchema = z.object({
  totalRevenue: z.number(),
  totalExpenses: z.number(),
  profit: z.number(),
});
export type GetFinanceSummaryOutputData = z.infer<
  typeof GetFinanceSummaryOutputSchema
>;
