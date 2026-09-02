import { ReadonlyURLSearchParams } from "next/navigation";

export type SearchQuery = Record<string, string | number | undefined | null>;

export function searchQuery(
  searchParams: ReadonlyURLSearchParams,
): SearchQuery {
  return {
    sortBy: searchParams.get("sortBy"),
    sortDirection: searchParams.get("sortDirection") ?? "asc",
    filterField: searchParams.get("filterField"),
    filterOperator: "contains",
    filterValue: searchParams.get("filterValue"),
  };
}

// Search Query Validation
const QUERY_PARAMS = ["organizationId", "organizationSlug"] as const;

export function isQueryValid(query: SearchQuery) {
  return QUERY_PARAMS.every(
    (param) => !Object.hasOwn(query, param) || query[param] !== undefined,
  );
}
