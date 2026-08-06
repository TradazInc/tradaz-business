import { NavBar } from "@/components/custom/dashboard/NavBar";
import { LayoutContainer } from "@/components/custom/dashboard/LayoutContainer";
import { ORGANIZATIONS_KEY, SESSION_KEY } from "@/utilities/cacheKeys";
import { getSession } from "@/server/services/auth";
import { getBusinesses } from "@/server/services/business";
import { SWRConfig } from "swr";
import { unauthorized } from "next/navigation";

export default async function BusinessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionPromise = getSession();
  const businessPromise = getBusinesses();

  const session = await sessionPromise;
  if (!session) unauthorized();

  return (
    <LayoutContainer>
      <SWRConfig
        value={{
          fallback: {
            [SESSION_KEY]: sessionPromise,
            [ORGANIZATIONS_KEY]: businessPromise,
          },
        }}
      >
        <NavBar />
        {children}
      </SWRConfig>
    </LayoutContainer>
  );
}
