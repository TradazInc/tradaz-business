import { PAGE_SIZE } from "@/data/constants";
import { authClient, authConfig } from "@/lib/authClient";
import { GetAllMembersOutputData } from "@/schema/member";

export async function getMembers(organizationId?: string) {
  const data = await authClient.organization.listMembers({
    query: { limit: PAGE_SIZE, organizationId },
    fetchOptions: authConfig,
  });

  return {
    data: data.members,
    meta: { count: data.total },
  } satisfies GetAllMembersOutputData;
}
