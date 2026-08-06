import { SESSION_KEY } from "@/utilities/cacheKeys";
import { authClient } from "@/lib/authClient";
import useSWR from "swr";

export const useSession = () => {
  return useSWR(SESSION_KEY, () =>
    authClient.getSession({ fetchOptions: { throw: true } }),
  );
};
