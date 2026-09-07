import { Gateway } from "@/entities/subaccount";
import { z } from "zod";

export const SubaccountSchema = z.object({
  gateway: z.enum(Gateway),
  bankCode: z.string().length(3, "Bank code must be 3 digits"),
  accountNumber: z
    .string()
    .length(10, "Account number must be 10 digits")
    .regex(/^\d+$/, "Account number must contain only numbers"),
});

export type SubaccountData = z.infer<typeof SubaccountSchema>;
export type SubaccountFormValues = z.input<typeof SubaccountSchema>;

export const UpdateSubaccountSchema = SubaccountSchema.extend({
  email: z.email(),
});

export type UpdateSubaccountData = z.infer<typeof UpdateSubaccountSchema>;
export type UpdateSubaccountFormValues = z.input<typeof UpdateSubaccountSchema>;
