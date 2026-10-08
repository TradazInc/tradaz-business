import { authClient, authConfig } from "@/lib/authClient";
import type { GetAllBusinessOutputData } from "@/schema/business";

export async function checkBusinessSlug(slug: string) {
  return authClient.organization.checkSlug({ slug }).then((res) => res);
}

export async function getBusinesses() {
  return authClient.organization.list({
    fetchOptions: authConfig,
  }) as Promise<GetAllBusinessOutputData>;
}

export async function getBusiness(organizationId?: string) {
  return authClient.organization.getFullOrganization({
    query: { organizationId, membersLimit: 100 },
  });
}
