"use client";

import { AppBase, computePath } from "@/utilities/computePath";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

/** "portal" on the staff portal, "dashboard" on the merchant dashboard. */
export function useAppBase(): AppBase {
  return usePathname().startsWith("/portal") ? "staff" : "merchant";
}

export function useComputePath() {
  const base = useAppBase();
  return useCallback(
    (businessId?: string, storeId?: string) =>
      computePath(base, businessId, storeId),
    [base],
  );
}
