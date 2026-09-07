import { OrgRole } from "@/entities/auth";
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
