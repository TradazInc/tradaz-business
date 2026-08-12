export function extractSearchParams(url: string) {
  const params = new URLSearchParams(url.split("?")[1]);
  return Object.fromEntries(params);
}
