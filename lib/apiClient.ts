import { setServerCookie } from "@/utilities/setServerCookie";
import { BetterFetchOption, createFetch } from "@better-fetch/fetch";
import { logger } from "@better-fetch/logger";
import { schema } from "./schema";
import { serverUrl } from "@/ini/configs";

export const apiClient = createFetch({
  schema,
  baseURL: serverUrl,
  credentials: "include",
  onRequest: async (context) => setServerCookie(context),
  plugins: [logger()],
});

export const apiConfig = { throw: true as const } satisfies BetterFetchOption;
