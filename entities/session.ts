import { customSession } from "better-auth/plugins";

export interface CustomSession {
  user: User;
  session: Session;
  teammember: TeamMember | null;
  member: Member | null;
}

export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
  banned?: boolean | null;
  role?: Role;
  banReason?: string | null;
  banExpires?: Date | null;
}

export interface Session {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  activeOrganizationId?: string | null;
  activeTeamId?: string | null;
}

export interface Member {
  id: string;
  createdAt: Date;
  organizationId: string;
  userId: string;
  role: OrgRole;
  approved: boolean;
}

export interface TeamMember {
  id: string;
  createdAt: Date | null;
  teamId: string;
  userId: string;
}

export enum OrgRole {
  owner = "owner",
  admin = "admin",
  sales = "sales",
  manager = "manager",
  vendor = "vendor",
  customer = "customer",
}

export enum Role {
  admin = "admin",
  user = "user",
}

// Mirror the server's auth shape for type inference.
export type ServerAuth = {
  options: { plugins: [ReturnType<typeof customSession<CustomSession>>] };
};
