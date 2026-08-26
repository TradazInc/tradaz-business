import { SWRInfiniteConfiguration } from "swr/infinite";

export const SILENT: SWRInfiniteConfiguration = {
  revalidateOnMount: false,
  revalidateIfStale: false,
};
