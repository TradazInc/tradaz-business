export const protocol =
  process.env.NODE_ENV === "production" ? "https" : "http";

export const rootDomain = new URL(
  process.env.NEXT_PUBLIC_BASE_URL || "localhost:3000",
).host;
