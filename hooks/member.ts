import { MEMBER_KEY } from "@/data/cacheKeys";
import { authClient } from "@/lib/authClient";
import { getIndexKey, getScopedKey } from "@/utilities/computeKey";
import { useSearchParams } from "next/navigation";
import { useSWRConfig } from "swr";
import useSWRInfinite, { unstable_serialize } from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useMembers = (organizationId: string | undefined) => {
  const searchParams = useSearchParams();
  const query = {
    organizationId,
    sortBy: searchParams.get("sortBy"),
    sortDirection: searchParams.get("sortDirection") ?? "asc",
    filterField: searchParams.get("filterField"),
    filterOperator: "contains",
    filterValue: searchParams.get("filterValue"),
  };

  return useSWRInfinite(getIndexKey(MEMBER_KEY, query), ([key, query]) =>
    authClient.organization.listMembers({
      query: {
        ...query,
        limit: query.pageSize,
        offset: (query.page - 1) * query.pageSize,
      },
      fetchOptions: { throw: true },
    }),
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
