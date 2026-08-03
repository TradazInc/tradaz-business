import { NavBar } from "@/components/custom/dashboard/NavBar";
import { LayoutContainer } from "@/components/custom/dashboard/LayoutContainer";
import { organizationsKey, sessionKey } from "@/data/cacheKeys";
import { getSession } from "@/apis/services/auth";
import { getBusinesses } from "@/apis/server/business";
import { SWRConfig } from "swr";
import { unauthorized } from "next/navigation";

export default async function BusinessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionPromise = getSession();
  const businessPromise = getBusinesses();

  const { data: session } = await sessionPromise;
  if (!session) unauthorized();

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
