import { sessionKey } from "@/data/cacheKeys";
import { authClient } from "@/lib/authClient";
import useSWR from "swr";

export const useSession = () => {
  return useSWR(sessionKey, () =>
    authClient.getSession().then((res) => res.data),
  );
};
