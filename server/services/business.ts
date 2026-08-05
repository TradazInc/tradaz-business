import { authClient } from "@/lib/authClient";

export async function checkBusinessSlug(slug: string) {
  return authClient.organization.checkSlug({ slug }).then((res) => res);
}

export async function getBusinesses(name?: string) {
  return authClient.organization.list({ query: { name } });
}

export async function getBusiness(organizationId?: string) {
  return authClient.organization.getFullOrganization({
    query: { organizationId, membersLimit: 100 },
  });
}
