import {
  Member,
  SessionWithImpersonatedBy,
  TeamMember,
  UserWithRole,
} from "better-auth/plugins";

export interface CustomSession {
  user: UserWithRole;
  session: SessionWithImpersonatedBy;
  teammember: TeamMember | null;
  member: Member | null;
}
