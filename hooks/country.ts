import { COUNTRY_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import {
  GetAllCountriesOutputData,
  GetAllCountriesQueryData,
} from "@/schema/country";
import { cache } from "@/utilities/cacheKey";
import useSWRInfinite, { SWRInfiniteConfiguration } from "swr/infinite";

export const useCountries = (
  query: GetAllCountriesQueryData | null,
  config?: SWRInfiniteConfiguration<GetAllCountriesOutputData, Error>,
) => {
  return useSWRInfinite(
    (pageIndex, previousPageData: GetAllCountriesOutputData | null) =>
      query
        ? cache.cursorKey(COUNTRY_KEY, query)(pageIndex, previousPageData)
        : null,
    ([key, query]) => apiClient("@get/api/country", { query, ...apiConfig }),
    config,
  );
};
