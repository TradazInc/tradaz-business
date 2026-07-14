import { baseURL } from "@/data/baseUrl";
import { Session } from "@/entities/Session";
import {
  adminClient,
  customSessionClient,
  inferOrgAdditionalFields,
  organizationClient,
} from "better-auth/client/plugins";
import { customSession } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";

// Mirror the server's auth shape for type inference.
type ServerAuth = {
  options: {
    plugins: [ReturnType<typeof customSession<Session>>];
  };
};

export const authClient = createAuthClient({
  baseURL: process.env.BASE_URL ?? baseURL,
  fetchOptions: { credentials: "include" },
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
