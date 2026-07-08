import { sessionEndpoint } from "@/data/swrEndpoints";
import { authClient } from "@/lib/auth";
import useSWR from "swr";

export const useSession = () => {
  return useSWR(sessionEndpoint, () =>
    authClient.getSession().then((res) => res.data),
  );
};
