import { PAGE_SIZE } from "@/data/constants";
import { authClient } from "@/lib/authClient";
import { GetAllMembersOutputData } from "@/schema/member";

export async function getMembers(organizationId?: string) {
  const { data, error } = await authClient.organization.listMembers({
    query: { limit: PAGE_SIZE, organizationId },
  });

  return {
    data: data
      ? ({
          data: data.members,
          meta: { count: data.total },
        } satisfies GetAllMembersOutputData)
      : null,
    error,
  };
}
