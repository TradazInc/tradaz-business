import { authClient } from "@/lib/auth";

export const useSession = () => {
  return authClient.useSession();
};
