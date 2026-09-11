import { MEMBER_KEY } from "@/data/cacheKeys";
import { authClient, authConfig } from "@/lib/authClient";
import { FetchResponse } from "@/schema/fetchResponse";
import { Member } from "@/schema/member";
import { getIndexKey, getScopedKey } from "@/utilities/computeKey";
import { searchQuery } from "@/utilities/searchQuery";
import { useSearchParams } from "next/navigation";
import { useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useMembers = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<FetchResponse<Member>, Error>,
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
        fetchOptions: authConfig,
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
        fetchOptions: authConfig,
      }),
    {
      onSuccess: () =>
        mutate(unstable_serialize(getIndexKey(MEMBER_KEY, { organizationId }))),
    },
  );
};
