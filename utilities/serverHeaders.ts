import "server-only";
import { headers } from "next/headers";

export async function getAuthHeaders() {
  // Extracts the cookie string from the incoming browser request
  const header = await headers();
  const cookieHeader = header.get("cookie");

  if (cookieHeader) return { cookie: cookieHeader };
  return {};
}
