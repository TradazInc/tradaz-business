import { auth } from "@/lib/auth";

export const useBusinesses = () => {
  return auth.useListOrganizations();
};
