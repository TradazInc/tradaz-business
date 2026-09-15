import { MEMBER_KEY } from "@/data/cacheKeys";
import { authClient, authConfig } from "@/lib/authClient";
import {
  GetAllMembersOutputData,
  GetAllMembersQuerySchema,
} from "@/schema/member";
import { getIndexKey, getScopedKey } from "@/utilities/computeKey";
import { useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { useSearchQuery } from "./useSearchQuery";

export const useMembers = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllMembersOutputData, Error>,
) => {
  const query = useSearchQuery(GetAllMembersQuerySchema);

  return useSWRInfinite(
    getIndexKey(MEMBER_KEY, { ...query, organizationId }),
    async ([key, query]): Promise<GetAllMembersOutputData> => {
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
