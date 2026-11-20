import { LayoutContainer } from "@/components/shared/LayoutContainer";
import { SESSION_KEY } from "@/data/cacheKeys";
import { requireRole } from "@/server/auth";
import { cache } from "@/utilities/cacheKey";
import { hasRole } from "@/utilities/hasRole";
import { SWRConfig, unstable_serialize } from "swr";

export default async function CustomerLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ subdomain: string }>;
}>) {
  const { subdomain } = await params;

  const { session } = await requireRole(
    { organizationSlug: subdomain },
    (role) => hasRole(role, "customer"),
  );

  return (
    <LayoutContainer>
      <SWRConfig
        value={{
          fallback: {
            [unstable_serialize(cache.key(SESSION_KEY))]: session,
          },
        }}
      >
        {children}
      </SWRConfig>
    </LayoutContainer>
  );
}
