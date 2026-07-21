import { baseURL } from "@/data/baseUrl";
import { FetchResponse } from "@/entities/FetchResponse";
import { BetterFetchOption, createFetch } from "@better-fetch/fetch";

export const fetchInstance = createFetch({
  baseURL: process.env.BASE_URL ?? baseURL,
  retry: { type: "linear", attempts: 3, delay: 1000 },
  credentials: "include",
  throw: true,
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
