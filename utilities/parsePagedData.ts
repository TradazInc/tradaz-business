import { pageSize } from "@/data/pageSize";
import { FetchResponse } from "@/entities/FetchResponse";

export function parsePagedData<D>(data?: FetchResponse<D>[]) {
  const pages = data ?? [];
  const flatData = pages.flatMap((page) => page?.data ?? []);
  const lastPage = pages[pages.length - 1];
  const hasMore = lastPage ? lastPage.data.length === pageSize : true;

  return { flatData, hasMore };
}
