import { setServerCookie } from "@/utilities/setServerCookie";
import { BetterFetchOption, createFetch } from "@better-fetch/fetch";
import { logger } from "@better-fetch/logger";
import { SWRInfiniteConfiguration } from "swr/infinite";

const $fetch = createFetch({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: "include",
  onRequest: async (context) => setServerCookie(context),
  plugins: [logger()],
});

export interface FetchResponse<D> {
  data: D[];
  aggregate?: number;
  meta?: {
    next?: string;
    count?: number;
    totalPages?: number;
  };
}

export type SWRInfiniteConfig<T> = SWRInfiniteConfiguration<
  FetchResponse<T>,
  Error
>;

export class ApiClient<T> {
  constructor(private readonly endpoint: string) {}

  getAll = <Throw extends boolean = false>(
    options?: BetterFetchOption & { throw?: Throw },
  ) =>
    $fetch<FetchResponse<T>, Throw extends true ? false : unknown>(
      this.endpoint,
      { ...options, method: "GET" },
    );

  get = <Throw extends boolean = false>(
    id: number | string,
    options?: BetterFetchOption & { throw?: Throw },
  ) =>
    $fetch<T, Throw extends true ? false : unknown>(`${this.endpoint}/${id}`, {
      ...options,
      method: "GET",
    });

  post = <Throw extends boolean = false>(
    options: BetterFetchOption & { throw?: Throw },
  ) =>
    $fetch<T, Throw extends true ? false : unknown>(this.endpoint, {
      ...options,
      method: "POST",
    });

  update = <Throw extends boolean = false>(
    id: number | string,
    options: BetterFetchOption & { throw?: Throw },
  ) =>
    $fetch<T, Throw extends true ? false : unknown>(`${this.endpoint}/${id}`, {
      ...options,
      method: "PUT",
    });

  delete = <Throw extends boolean = false>(
    id: number | string,
    options?: BetterFetchOption & { throw?: Throw },
  ) =>
    $fetch<void, Throw extends true ? false : unknown>(
      `${this.endpoint}/${id}`,
      { ...options, method: "DELETE" },
    );
}
