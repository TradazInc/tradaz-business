import { NavBar } from "@/app/ui/dashboard/NavBar";
import { LayoutContainer } from "@/app/ui/dashboard/LayoutContainer";
import { organizationsKey, sessionKey } from "@/data/cacheKeys";
import { getSession } from "@/server/auth";
import { getBusinesses } from "@/server/business";
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
