import { baseURL } from "@/data/baseUrl";
import { BetterFetchOption, createFetch } from "@better-fetch/fetch";

enum HttpMethod {
  Get = "GET",
  Put = "PUT",
  Post = "POST",
  Patch = "PATCH",
  Delete = "DELETE",
}

export const fetchInstance = createFetch({
  baseURL: process.env.BASE_URL ?? baseURL,
  retry: { type: "linear", attempts: 3, delay: 1000 },
  credentials: "include",
});

export class ApiClient<T> {
  constructor(private readonly endpoint: string) {}

  getAll = (options?: BetterFetchOption) => {
    return fetchInstance<T[]>(this.endpoint, {
      ...options,
      method: HttpMethod.Get,
    }).then((res) => res.data);
  };

  get = (id: number | string) => {
    return fetchInstance<T>(`${this.endpoint}/${id}`, {
      method: HttpMethod.Get,
    }).then((res) => res.data);
  };

  post = (options: BetterFetchOption) => {
    return fetchInstance<T>(this.endpoint, {
      ...options,
      method: HttpMethod.Post,
    }).then((res) => res.data);
  };

  update = (id: number | string, options: BetterFetchOption) => {
    return fetchInstance<T>(`${this.endpoint}/${id}`, {
      ...options,
      method: HttpMethod.Put,
    }).then((res) => res.data);
  };

  delete = (id: number | string) => {
    return fetchInstance<void>(`${this.endpoint}/${id}`, {
      method: HttpMethod.Delete,
    }).then((res) => res.data);
  };
}
