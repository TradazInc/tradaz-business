import { authClient } from "./auth";

enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export class ApiClient<T> {
  constructor(private readonly endpoint: string) {}

  getAll = (query?: Record<string, string | number>) => {
    return authClient
      .$fetch<T[]>(this.endpoint, { query })
      .then(({ data, error }) => {
        if (error) throw error;
        return data;
      });
  };

  get = (id: number | string) => {
    return authClient
      .$fetch<T>(`${this.endpoint}/${id}`)
      .then(({ data, error }) => {
        if (error) throw error;
        return data;
      });
  };

  post = (body: BodyInit) => {
    return authClient
      .$fetch<T>(this.endpoint, {
        method: HttpMethod.POST,
        body,
      })
      .then(({ data, error }) => {
        if (error) throw error;
        return data;
      });
  };

  update = (id: number | string, body: BodyInit) => {
    return authClient
      .$fetch<T>(`${this.endpoint}/${id}`, {
        method: HttpMethod.PUT,
        body,
      })
      .then(({ data, error }) => {
        if (error) throw error;
        return data;
      });
  };

  delete = (id: number | string) => {
    return authClient
      .$fetch<void>(`${this.endpoint}/${id}`, {
        method: HttpMethod.DELETE,
      })
      .then(({ data, error }) => {
        if (error) throw error;
        return data;
      });
  };
}
