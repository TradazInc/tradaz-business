"use client";

import { toaster } from "@/components/ui/toaster";
import { errorOptions } from "@/utilities/errorToastOptions";
import { BetterFetchError } from "@better-fetch/fetch";
import { SWRConfig } from "swr";

export const SWRProvider = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig
    value={{
      onError: (e) => toaster.error(errorOptions(e)),
      errorRetryCount: 3,
      shouldRetryOnError: (e) =>
        !(e instanceof BetterFetchError) || e.status >= 500,
    }}
  >
    {children}
  </SWRConfig>
);
