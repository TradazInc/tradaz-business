import { PAGE_SIZE } from "@/data/constants";
import { Member } from "@/entities/member";
import { FetchResponse } from "@/lib/apiClient";
import { authClient } from "@/lib/authClient";

export async function getMembers(organizationId?: string) {
  const { data, error } = await authClient.organization.listMembers({
    query: { limit: PAGE_SIZE, organizationId },
  });

  return {
    data: data
      ? ({
          data: data.members,
          meta: { count: data.total },
        } satisfies FetchResponse<Member>)
      : null,
    error,
  };
}
