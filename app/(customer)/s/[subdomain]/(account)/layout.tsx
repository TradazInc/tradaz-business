import { LayoutContainer } from "@/components/shared/LayoutContainer";
import { SESSION_KEY } from "@/data/cacheKeys";
import { getSession } from "@/server/auth";
import { cache } from "@/utilities/cacheKey";
import { unauthorized } from "next/navigation";
import { SWRConfig, unstable_serialize } from "swr";

export default async function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  if (!session.data || session.error) unauthorized();

  return (
    <LayoutContainer>
      <SWRConfig
        value={{
          fallback: {
            [unstable_serialize(cache.key(SESSION_KEY))]: session.data,
          },
        }}
      >
        {children}
      </SWRConfig>
    </LayoutContainer>
  );
}
