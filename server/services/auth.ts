import { authClient } from "@/lib/authClient";

export async function getSession() {
  return authClient.getSession();
}
