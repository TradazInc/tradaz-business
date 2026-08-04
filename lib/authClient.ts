import { ServerAuth } from "@/server/entities/session";
import { setServerCookie } from "@/utilities/setServerCookie";
import {
  adminClient,
  customSessionClient,
  inferOrgAdditionalFields,
  organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  fetchOptions: {
    credentials: "include",
    onRequest: async (context) => setServerCookie(context),
  },
  plugins: [
    customSessionClient<ServerAuth>(),
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
