import type { authClient } from "@/lib/authClient";

export type Auth = typeof authClient.$Infer.Session;
export type User = Auth["user"];
export type Session = Auth["session"];
export type TeamMember = Auth["teammember"];
export type SessionMember = Auth["member"];

export enum OrgRole {
  owner = "owner",
  admin = "admin",
  member = "member",
  // sales = "sales",
  // manager = "manager",
  // vendor = "vendor",
  // customer = "customer",
}

export enum Role {
  admin = "admin",
  user = "user",
}
