import { LayoutContainer } from "@/components/shared/LayoutContainer";
import { SESSION_KEY } from "@/data/cacheKeys";
import { requireSession } from "@/server/auth";
import { cache } from "@/utilities/cacheKey";
import { SWRConfig, unstable_serialize } from "swr";

export default async function StaffLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireSession();

  return (
    <LayoutContainer>
      <SWRConfig
        value={{
          fallback: { [unstable_serialize(cache.key(SESSION_KEY))]: session },
        }}
      >
        {children}
      </SWRConfig>
    </LayoutContainer>
  );
}
