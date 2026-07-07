export interface FetchResponse<T> {
  data: T[];
  pagination: {
    page: 1;
    pageSize: 0;
    count: 0;
  };
}
