import { authClient } from "@/lib/authClient";
import { serverHeaders } from "@/utilities/serverHeaders";
import { unauthorized } from "next/navigation";
import "server-only";

export async function getSession() {
  const { data: session } = await authClient.getSession({
    fetchOptions: { headers: await serverHeaders() },
  });

  if (!session) unauthorized();
  return session;
}
