import { authClient } from "@/lib/authClient";
import type { Business } from "@/schema/business";

export async function checkBusinessSlug(slug: string) {
  return authClient.organization.checkSlug({ slug }).then((res) => res);
}

export async function getBusinesses() {
  const businesses = await authClient.organization.list();
  return businesses as typeof businesses & { data: Business[] | null };
}

export async function getBusiness(organizationId?: string) {
  return authClient.organization.getFullOrganization({
    query: { organizationId, membersLimit: 100 },
  });
}
