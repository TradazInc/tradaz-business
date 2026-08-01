import { headers } from "next/headers";
import "server-only";

export async function serverHeaders() {
  // Extracts the cookie string from the incoming browser request
  const header = await headers();
  const cookie = header.get("cookie") ?? "";

  return { cookie };
}
