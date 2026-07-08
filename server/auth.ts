import "server-only";
import { authClient } from "@/lib/auth";
import { allowedRoles } from "@/entities/Session";
import { headers } from "next/headers";
import { forbidden, unauthorized } from "next/navigation";

export async function getAuthorizedSession() {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: { cookie: (await headers()).get("cookie") ?? "" },
    },
  });

  if (!session) unauthorized();

  if (!session.member?.role || !allowedRoles.includes(session.member?.role))
    forbidden();

  return session;
}
