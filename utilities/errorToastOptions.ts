"use client";

import { BetterFetchError } from "@better-fetch/fetch";
import { ToastOptions } from "@chakra-ui/react";
import { CloudinaryUploadWidgetError } from "next-cloudinary";

export function errorToastOptions(e: unknown): ToastOptions {
  if (e instanceof BetterFetchError) {
    return {
      title: e.error?.code || e.statusText || e.name,
      description: e.error?.message || e.message || e.status,
      type: "error",
    };
  } else if (isCloudinaryUploadWidgetError(e)) {
    return {
      title: typeof e === "string" ? "Upload error" : e?.statusText,
      description: typeof e === "string" ? e : e?.status,
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

function isCloudinaryUploadWidgetError(
  data: unknown,
): data is CloudinaryUploadWidgetError {
  // cast as cloudinary upload widget error
  const err = data as CloudinaryUploadWidgetError;

  // allow null to fall through
  if (err === null) return false;

  // validate properties
  return (
    typeof err === "string" ||
    (typeof err.status === "string" && typeof err.statusText === "string")
  );
}
