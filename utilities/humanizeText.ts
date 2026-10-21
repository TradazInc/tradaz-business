export const humanizeText = (text: string) => {
  // replace 'organization' with business & 'team' with 'store'
  const formatted =
    text === "organization" ? "business" : text === "team" ? "store" : text;

  const spaced = formatted
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/-/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
};
