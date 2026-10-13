export function selectorSafeId(id: string) {
  return `ID-${id.replace(/[^\w-]/g, "")}`;
}
