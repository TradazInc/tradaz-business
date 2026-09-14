import { COUNTRY_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import {
  GetAllCountriesOutputData,
  GetAllCountriesQuerySchema,
} from "@/schema/country";
import { getCursorKey } from "@/utilities/computeKey";
import { useSearchParams } from "next/navigation";
import useSWRInfinite, { SWRInfiniteConfiguration } from "swr/infinite";

export const useCountries = (
  config?: SWRInfiniteConfiguration<GetAllCountriesOutputData, Error>,
) => {
  const searchParams = useSearchParams();
  const query = GetAllCountriesQuerySchema.parse(searchParams);

  return useSWRInfinite(
    getCursorKey(COUNTRY_KEY, query),
    ([key, query]) => apiClient("@get/api/country", { query, ...apiConfig }),
    config,
  );
};
