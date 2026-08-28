import { NavBar } from "@/components/custom/dashboard/NavBar";
import { LayoutContainer } from "@/components/custom/dashboard/LayoutContainer";
import { BUSINESS_KEY, SESSION_KEY } from "@/data/cacheKeys";
import { getSession } from "@/server/services/auth";
import { getBusinesses } from "@/server/services/business";
import { SWRConfig, unstable_serialize } from "swr";
import { unauthorized } from "next/navigation";

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
            [unstable_serialize([SESSION_KEY])]: session.data,
            [unstable_serialize([BUSINESS_KEY])]: business.data,
          },
        }}
      >
        <NavBar />
        {children}
      </SWRConfig>
    </LayoutContainer>
  );
}
