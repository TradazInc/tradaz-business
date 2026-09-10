import { SWRInfiniteConfiguration } from "swr/infinite";

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
