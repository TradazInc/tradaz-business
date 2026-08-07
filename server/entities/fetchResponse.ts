export interface FetchResponse<D> {
  data: D[];
  aggregate?: number;
  meta: {
    next?: string;
    count?: number;
    totalPages?: number;
  };
}
