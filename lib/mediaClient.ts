import { BetterFetchOption, createFetch } from "@better-fetch/fetch";
import { logger } from "@better-fetch/logger";

const $fetch = createFetch({
  baseURL: process.env.NEXT_PUBLIC_CLOUDINARY_URL,
  plugins: [logger()],
});

export class MediaClient<T> {
  constructor(private readonly endpoint: string) {}

  post = <Throw extends boolean = false>(
    id: number | string,
    options: BetterFetchOption & { throw?: Throw },
  ) =>
    $fetch<T, Throw extends true ? false : unknown>(`${this.endpoint}/${id}`, {
      ...options,
      method: "POST",
    });
}
