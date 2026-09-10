import { authClient } from "@/lib/authClient";

export type Member = typeof authClient.$Infer.Member & {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null | undefined;
  };
};

export enum OrgRole {
  owner = "owner",
  admin = "admin",
  member = "member",
  // sales = "sales",
  // manager = "manager",
  // vendor = "vendor",
  // customer = "customer",
}
