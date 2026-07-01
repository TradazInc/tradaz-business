import "server-only";
import { authClient } from "@/lib/auth";
import { headers } from "next/headers";

export async function getBusinesses() {
  return authClient.organization.list({
    fetchOptions: {
      headers: { cookie: (await headers()).get("cookie") ?? "" },
    },
  });
}
