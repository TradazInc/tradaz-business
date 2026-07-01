import "server-only";
import { authClient } from "@/lib/auth";
import { headers } from "next/headers";

export async function getStores(organizationId?: string) {
  return authClient.organization.listTeams({
    query: { organizationId },
    fetchOptions: {
      headers: { cookie: (await headers()).get("cookie") ?? "" },
    },
  });
}
