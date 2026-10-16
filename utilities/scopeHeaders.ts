export const scopeHeaders = (
  organizationId: string | undefined,
  teamId?: string,
) => ({
  ...(organizationId && { "x-organization-id": organizationId }),
  ...(teamId && { "x-team-id": teamId }),
});
