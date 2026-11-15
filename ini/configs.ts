const client = new URL(
  process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000",
);
export const protocol = client.protocol.replace(":", "");
export const rootDomain = client.host; // "localhost:3000" | "tradaz.com"

