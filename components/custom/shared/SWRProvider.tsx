"use client";

import { toaster } from "@/components/ui/toaster";
import { errorOptions } from "@/utilities/errorToastOptions";
import { SWRConfig } from "swr";

export const SWRProvider = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig value={{ onError: (e) => toaster.error(errorOptions(e)) }}>
    {children}
  </SWRConfig>
);
