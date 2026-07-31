import { authClient } from "@/lib/authClient";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
import "server-only";

export async function getSession() {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: { cookie: (await headers()).get("cookie") ?? "" },
    },
  });

  if (!session) unauthorized();

  return session;
}
