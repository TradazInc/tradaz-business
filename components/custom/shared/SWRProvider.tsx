"use client";

import { errorToast } from "@/utilities/errorToast";
import { SWRConfig } from "swr";

export const SWRProvider = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig value={{ onError: (e) => errorToast(e) }}>{children}</SWRConfig>
);
