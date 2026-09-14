// Search Query Validation
const QUERY_PARAMS = ["organizationId", "organizationSlug"] as const;

export function isQueryValid(query: unknown) {
  const q = query as Record<string, unknown>;

  return QUERY_PARAMS.every(
    (param) => !Object.hasOwn(q, param) || q[param] !== undefined,
  );
}
