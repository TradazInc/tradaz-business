"use client";

import { toaster } from "@/components/ui/toaster";
import { BetterFetchError } from "@better-fetch/fetch";

function errorOptions(e: unknown) {
  if (e instanceof BetterFetchError) {
    return {
      title: e.error?.message ?? e.statusText,
      description: e.error?.code ?? `Error ${e.status}`,
      closable: true,
    };
  } else if (e instanceof Error) {
    return {
      title: "Something went wrong",
      description: e.message,
      closable: true,
    };
  } else {
    return {
      title: "Something went wrong",
      description: "Please try again.",
      closable: true,
    };
  }
}

export function errorToast(e: unknown) {
  toaster.error(errorOptions(e));
}
