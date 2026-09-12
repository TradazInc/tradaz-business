import { authClient } from "@/lib/authClient";
import { OrgRole } from "@/schema/enums";
import { z } from "zod";

// Create
const CreateInvitationInputSchema = z.object({
  email: z.string(),
  role: z.enum(OrgRole),
  organizationId: z.string(),
  teamId: z.string().optional(),
});
export type CreateInvitationInputData = z.infer<
  typeof CreateInvitationInputSchema
>;

export const emptyInvitation: CreateInvitationInputData = {
  email: "",
  role: OrgRole.member,
  organizationId: "",
  teamId: "",
};

export type Invitation = typeof authClient.$Infer.Invitation;
