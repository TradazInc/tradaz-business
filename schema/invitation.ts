import { authClient } from "@/lib/authClient";
import { OrgRole } from "@/schema/member";
import { z } from "zod";

const invitationSchema = z.object({
  email: z.string(),
  role: z.enum(OrgRole),
  organizationId: z.string(),
  teamId: z.string().optional(),
});
export type InvitationData = z.infer<typeof invitationSchema>;
export type InvitationFormValues = z.input<typeof invitationSchema>;

export const emptyInvitation: InvitationFormValues = {
  email: "",
  role: OrgRole.member,
  organizationId: "",
  teamId: "",
};

export type Invitation = typeof authClient.$Infer.Invitation;
