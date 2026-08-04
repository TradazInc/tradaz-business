import { setServerCookie } from "@/utilities/setServerCookie";
import { BetterFetchOption, createFetch } from "@better-fetch/fetch";
import { FetchResponse } from "@/server/entities/fetchResponse";

export const fetchInstance = createFetch({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: "include",
  retry: { type: "linear", attempts: 3, delay: 1000 },
  throw: true,
  onRequest: async (context) => setServerCookie(context),
});

export class ApiClient<T> {
  constructor(private readonly endpoint: string) {}

  getAll = async (options?: BetterFetchOption) => {
    return fetchInstance<FetchResponse<T>>(this.endpoint, {
      ...options,
      method: "GET",
    }).then((res) => res);
  };

  get = async (id: number | string) => {
    return fetchInstance<T>(`${this.endpoint}/${id}`, {
      method: "GET",
    }).then((res) => res);
  };

  post = async (options: BetterFetchOption) => {
    return fetchInstance<T>(this.endpoint, {
      ...options,
      method: "POST",
    }).then((res) => res);
  };

  update = async (id: number | string, options: BetterFetchOption) => {
    return fetchInstance<T>(`${this.endpoint}/${id}`, {
      ...options,
      method: "PUT",
    }).then((res) => res);
  };

  delete = async (id: number | string) => {
    return fetchInstance<void>(`${this.endpoint}/${id}`, {
      method: "DELETE",
    }).then((res) => res);
  };
}
