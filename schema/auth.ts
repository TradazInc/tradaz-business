import { authClient } from "@/lib/authClient";
import { z } from "zod";

export const emailSignUpSchema = z.object({
  name: z.string({ error: "name is required" }).min(3),
  email: z.email({ error: "email is required" }),
  password: z.string({ error: "Password is required" }).trim().min(5),
});
export type EmailSignUpData = z.infer<typeof emailSignUpSchema>;

export const emailSignInSchema = z.object({
  email: z.email({ error: "email is required" }),
  password: z.string({ error: "password is required" }).trim().min(5),
});
export type EmailSignInData = z.infer<typeof emailSignInSchema>;

export type Auth = typeof authClient.$Infer.Session;
export type User = Auth["user"];
export type Session = Auth["session"];
export type TeamMember = Auth["teammember"];
export type SessionMember = Auth["member"];
