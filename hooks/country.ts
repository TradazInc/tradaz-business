import { COUNTRY_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import {
  GetAllCountriesOutputData,
  GetAllCountriesQuerySchema,
} from "@/schema/country";
import { getCursorKey } from "@/utilities/computeKey";
import useSWRInfinite, { SWRInfiniteConfiguration } from "swr/infinite";
import { useSearchQuery } from "./useSearchQuery";

export const useCountries = (
  config?: SWRInfiniteConfiguration<GetAllCountriesOutputData, Error>,
) => {
  const query = useSearchQuery(GetAllCountriesQuerySchema);

  return useSWRInfinite(
    getCursorKey(COUNTRY_KEY, query),
    ([key, query]) => apiClient("@get/api/country", { query, ...apiConfig }),
    config,
  );
};
