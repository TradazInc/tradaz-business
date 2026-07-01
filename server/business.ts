import "server-only";
import { authClient } from "@/lib/auth";
import { headers } from "next/headers";

export async function getBusinesses(name?: string) {
  return authClient.organization.list({
    query: { name },
    fetchOptions: {
      headers: { cookie: (await headers()).get("cookie") ?? "" },
    },
  });
}

export async function getBusiness(organizationId?: string) {
  return authClient.organization.getFullOrganization({
    query: { organizationId, membersLimit: 100 },
  });
}
