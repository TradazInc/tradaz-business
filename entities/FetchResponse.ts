export interface FetchResponse<D> {
  data: D[];
  meta: {
    next?: string;
    count?: number;
    totalPages?: number;
  };
}
