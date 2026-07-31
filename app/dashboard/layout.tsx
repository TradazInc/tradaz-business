import { NavBar } from "@/components/custom/dashboard/NavBar";
import { LayoutContainer } from "@/components/custom/dashboard/LayoutContainer";
import { organizationsKey, sessionKey } from "@/data/cacheKeys";
import { getSession } from "@/server/server/auth";
import { getBusinesses } from "@/server/server/business";
import { SWRConfig } from "swr";

export default async function BusinessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionPromise = getSession();
  const businessPromise = getBusinesses();

  return (
    <LayoutContainer>
      <SWRConfig
        value={{
          fallback: {
            [sessionKey]: sessionPromise,
            [organizationsKey]: businessPromise,
          },
        }}
      >
        <NavBar />
        {children}
      </SWRConfig>
    </LayoutContainer>
  );
}
