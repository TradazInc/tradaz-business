import { SESSION_KEY } from "@/data/swrCacheKeys";
import { authClient } from "@/lib/authClient";
import useSWR from "swr";

export const useSession = () => {
  return useSWR(SESSION_KEY, () =>
    authClient.getSession().then((res) => res.data),
  );
};
