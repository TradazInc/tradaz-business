export const scopeHeaders = (
  organizationId: string | undefined,
  teamId: string | undefined,
) => ({
  ...(organizationId && { "x-organization-id": organizationId }),
  ...(teamId && { "x-team-id": teamId }),
});
