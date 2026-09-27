import { setServerCookie } from "@/utilities/setServerCookie";
import { BetterFetchOption, createFetch } from "@better-fetch/fetch";
import { logger } from "@better-fetch/logger";
import { schema } from "./schema";

export const apiClient = createFetch({
  schema,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: "include",
  onRequest: async (context) => setServerCookie(context),
  plugins: [logger()],
});

export const apiConfig = { throw: true as const } satisfies BetterFetchOption;
