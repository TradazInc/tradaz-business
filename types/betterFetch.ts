import { BetterFetchOption, BetterFetchResponse } from "@better-fetch/fetch";

export type Response<D, O extends BetterFetchOption> = O extends { throw: true }
  ? D
  : BetterFetchResponse<D>;
