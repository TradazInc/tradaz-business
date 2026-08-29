import { NavBar } from "@/components/custom/dashboard/NavBar";
import { LayoutContainer } from "@/components/custom/dashboard/LayoutContainer";
import { BUSINESS_KEY, SESSION_KEY } from "@/data/cacheKeys";
import { getSession } from "@/server/auth";
import { getBusinesses } from "@/server/business";
import { SWRConfig, unstable_serialize } from "swr";
import { unauthorized } from "next/navigation";
import { getKey } from "@/utilities/computeKey";

export default async function BusinessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [session, business] = await Promise.all([
    getSession(),
    getBusinesses(),
  ]);
  if (!session.data || session.error) unauthorized();

  return (
    <LayoutContainer>
      <SWRConfig
        value={{
          fallback: {
            [unstable_serialize(getKey(SESSION_KEY))]: session.data,
            [unstable_serialize(getKey(BUSINESS_KEY))]: business.data,
          },
        }}
      >
        <NavBar />
        {children}
      </SWRConfig>
    </LayoutContainer>
  );
}
