"use client";

import { BetterFetchError } from "@better-fetch/fetch";
import { ToastOptions } from "@chakra-ui/react";

export function errorOptions(e: unknown): ToastOptions {
  if (e instanceof BetterFetchError) {
    return {
      title: e.name ?? e.statusText,
      description: e.message ?? `Error ${e.status}`,
      type: "error",
    };
  } else if (e instanceof Error) {
    return {
      title: e.name,
      description: e.message,
      type: "error",
    };
  } else {
    return {
      title: "Something went wrong",
      description: "Please try again.",
      type: "error",
    };
  }
}
