import { FetchResponse } from "@/server/entities/fetchResponse";
import { Response } from "@/types/betterFetch";
import { setServerCookie } from "@/utilities/setServerCookie";
import { BetterFetchOption, createFetch } from "@better-fetch/fetch";
import { logger } from "@better-fetch/logger";

export const fetchInstance = createFetch({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: "include",
  retry: { type: "linear", attempts: 3, delay: 1000 },
  onRequest: async (context) => setServerCookie(context),
  plugins: [logger()],
});

export class ApiClient<T> {
  constructor(private readonly endpoint: string) {}

  getAll = async <O extends BetterFetchOption>(options?: O) =>
    fetchInstance<FetchResponse<T>>(this.endpoint, {
      ...options,
      method: "GET",
    }) as Promise<Response<FetchResponse<T>, O>>;

  get = async <O extends BetterFetchOption>(id: number | string, options?: O) =>
    fetchInstance<T>(`${this.endpoint}/${id}`, {
      ...options,
      method: "GET",
    }) as Promise<Response<T, O>>;

  post = async <O extends BetterFetchOption>(options: O) =>
    fetchInstance<T>(this.endpoint, {
      ...options,
      method: "POST",
    }) as Promise<Response<T, O>>;

  update = async <O extends BetterFetchOption>(
    id: number | string,
    options: O,
  ) =>
    fetchInstance<T>(`${this.endpoint}/${id}`, {
      ...options,
      method: "PUT",
    }) as Promise<Response<T, O>>;

  delete = async <O extends BetterFetchOption>(
    id: number | string,
    options?: O,
  ) =>
    fetchInstance<void>(`${this.endpoint}/${id}`, {
      ...options,
      method: "DELETE",
    }) as Promise<Response<void, O>>;
}
