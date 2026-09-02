import { MEMBER_KEY } from "@/data/cacheKeys";
import { Member } from "@/entities/member";
import { FetchResponse, SWRInfiniteConfig } from "@/lib/apiClient";
import { authClient } from "@/lib/authClient";
import { getIndexKey, getScopedKey } from "@/utilities/computeKey";
import { searchQuery } from "@/utilities/searchQuery";
import { useSearchParams } from "next/navigation";
import { useSWRConfig } from "swr";
import useSWRInfinite, { unstable_serialize } from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useMembers = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfig<Member>,
) => {
  const searchParams = useSearchParams();
  const query = { organizationId, ...searchQuery(searchParams) };

  return useSWRInfinite(
    getIndexKey(MEMBER_KEY, query),
    async ([key, query]): Promise<FetchResponse<Member>> => {
      const res = await authClient.organization.listMembers({
        query: {
          ...query,
          limit: query.pageSize,
          offset: query.page * query.pageSize,
        },
        fetchOptions: { throw: true },
      });
      return { data: res.members, meta: { count: res.total } };
    },
    config,
  );
};

export const useRemoveMember = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(MEMBER_KEY, organizationId),
    (key, { arg }: { arg: string }) =>
      authClient.organization.removeMember({
        memberIdOrEmail: arg,
        organizationId,
        fetchOptions: { throw: true },
      }),
    {
      onSuccess: () =>
        mutate(unstable_serialize(getIndexKey(MEMBER_KEY, { organizationId }))),
    },
  );
};
