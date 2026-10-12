import { authClient, authConfig } from "@/lib/authClient";
import type { GetAllBusinessOutputData } from "@/schema/business";
import { cache } from "react";

export async function checkBusinessSlug(slug: string) {
  return authClient.organization.checkSlug({ slug }).then((res) => res);
}

export const getBusinesses = cache(async () => {
  return authClient.organization.list({
    fetchOptions: authConfig,
  }) as Promise<GetAllBusinessOutputData>;
});

export async function getBusiness(organizationId?: string) {
  return authClient.organization.getFullOrganization({
    query: { organizationId, membersLimit: 100 },
  });
}
