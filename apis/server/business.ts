import { authClient } from "@/lib/authClient";
import { serverHeaders } from "@/utilities/serverHeaders";

export async function getBusinesses(name?: string) {
  return authClient.organization.list({
    query: { name },
    fetchOptions: { headers: await serverHeaders() },
  });
}

export async function getBusiness(organizationId?: string) {
  return authClient.organization.getFullOrganization({
    query: { organizationId, membersLimit: 100 },
    fetchOptions: { headers: await serverHeaders() },
  });
}
