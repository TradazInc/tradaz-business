import { ReadonlyURLSearchParams } from "next/navigation";

export function searchQuery(searchParams: ReadonlyURLSearchParams) {
  return {
    sortBy: searchParams.get("sortBy"),
    sortDirection: searchParams.get("sortDirection") ?? "asc",
    filterField: searchParams.get("filterField"),
    filterOperator: "contains",
    filterValue: searchParams.get("filterValue"),
  };
}
