import { baseURL } from "@/data/baseUrl";
import { setServerCookie } from "@/utilities/setServerCookie";
import { BetterFetchOption, createFetch } from "@better-fetch/fetch";

export interface FetchResponse<D> {
  data: D[];
  aggregate?: number;
  meta: {
    next?: string;
    count?: number;
    totalPages?: number;
  };
}

export const fetchInstance = createFetch({
  baseURL: process.env.BASE_URL ?? baseURL,
  credentials: "include",
  retry: { type: "linear", attempts: 3, delay: 1000 },
  throw: true,
  onRequest: async (context) => setServerCookie(context),
});

export class ApiClient<T> {
  constructor(private readonly endpoint: string) {}

  getAll = (options?: BetterFetchOption) => {
    return fetchInstance<FetchResponse<T>>(this.endpoint, {
      ...options,
      method: "GET",
    }).then((res) => res);
  };

  get = (id: number | string) => {
    return fetchInstance<T>(`${this.endpoint}/${id}`, {
      method: "GET",
    }).then((res) => res);
  };

  post = (options: BetterFetchOption) => {
    return fetchInstance<T>(this.endpoint, {
      ...options,
      method: "POST",
    }).then((res) => res);
  };

  update = (id: number | string, options: BetterFetchOption) => {
    return fetchInstance<T>(`${this.endpoint}/${id}`, {
      ...options,
      method: "PUT",
    }).then((res) => res);
  };

  delete = (id: number | string) => {
    return fetchInstance<void>(`${this.endpoint}/${id}`, {
      method: "DELETE",
    }).then((res) => res);
  };
}
