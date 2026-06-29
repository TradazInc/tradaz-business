import { authClient } from "@/lib/auth";

export const useBusinesses = () => {
  return authClient.useListOrganizations();
};
