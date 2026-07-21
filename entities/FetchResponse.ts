export interface FetchResponse<D> {
  data: D[];
  meta: { next?: string; page: number; pageSize: number };
}
