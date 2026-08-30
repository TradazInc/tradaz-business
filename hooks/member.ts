import { MEMBER_KEY } from "@/data/cacheKeys";
import { authClient } from "@/lib/authClient";
import { getIndexKey } from "@/utilities/computeKey";
import { useSearchParams } from "next/navigation";
import useSWRInfinite from "swr/infinite";

export const useMembers = (organizationId: string | undefined) => {
  const searchParams = useSearchParams();
  const query = {
    organizationId,
    sortBy: searchParams.get("sortBy") ?? "createdAt",
    sortDirection: "desc",
    filterBy: searchParams.get("filterBy") ?? undefined,
    filterOperator: "contains",
    filterValue: searchParams.get("filterValue") ?? undefined,
  };

  return useSWRInfinite(getIndexKey(MEMBER_KEY, query), ([key, query]) =>
    authClient.organization.listMembers({
      query: { ...query, limit: query.pageSize, offset: query.page },
      fetchOptions: { throw: true },
    }),
  );
};
