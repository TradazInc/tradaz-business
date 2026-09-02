import { setServerCookie } from "@/utilities/setServerCookie";
import { logger } from "@better-fetch/logger";
import {
  adminClient,
  customSessionClient,
  inferOrgAdditionalFields,
  organizationClient,
} from "better-auth/client/plugins";
import {
  customSession,
  Member,
  SessionWithImpersonatedBy,
  TeamMember,
  UserWithRole,
} from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";

export interface CustomSession {
  user: UserWithRole;
  session: SessionWithImpersonatedBy;
  teammember: TeamMember | null;
  member: Member | null;
}

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  fetchOptions: {
    credentials: "include",
    onRequest: async (context) => setServerCookie(context),
    plugins: [logger()],
  },
  plugins: [
    customSessionClient<{
      options: { plugins: [ReturnType<typeof customSession<CustomSession>>] };
    }>(),
    adminClient(),
    organizationClient({
      teams: { enabled: true },
      schema: inferOrgAdditionalFields({
        organization: {
          additionalFields: {
            categoryId: { type: "string", input: true, required: true },
          },
        },
        team: {
          additionalFields: {
            address: { type: "string", input: true, required: true },
          },
        },
      }),
    }),
  ],
});

export type AuthClient = typeof authClient;
