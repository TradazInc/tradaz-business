"use client";

import { toaster } from "@/components/ui/toaster";
import { BetterFetchError } from "@better-fetch/fetch";

export function errorToast(e: unknown) {
  const { status, statusText } = e as BetterFetchError;
  toaster.error({ title: statusText, description: status });
}
