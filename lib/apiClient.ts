import { baseURL } from "@/data/baseUrl";
import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL ?? baseURL,
  withCredentials: true,
});

export class ApiClient<T> {
  constructor(private readonly endpoint: string) {}

  getAll = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .get<T[]>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = (id: number | string) => {
    return axiosInstance
      .get<T>(`${this.endpoint}/${id}`)
      .then((res) => res.data);
  };

  post = (data: unknown) => {
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };

  update = (id: number | string, data: unknown) => {
    return axiosInstance
      .put<T>(`${this.endpoint}/${id}`, data)
      .then((res) => res.data);
  };

  delete = (id: number | string) => {
    return axiosInstance
      .delete<void>(`${this.endpoint}/${id}`)
      .then((res) => res.data);
  };
}
