import { NavBar } from "@/app/ui/dashboard/NavBar";
import { LayoutContainer } from "@/app/ui/LayoutContainer";
import { organizationsEndpoint, sessionEndpoint } from "@/data/swrEndpoints";
import { getAuthorizedSession } from "@/server/auth";
import { getBusinesses } from "@/server/business";
import { SWRConfig } from "swr";

export default async function BusinessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionPromise = getAuthorizedSession();
  const businessPromise = getBusinesses();

  return (
    <LayoutContainer>
      <SWRConfig
        value={{
          fallback: {
            [sessionEndpoint]: sessionPromise,
            [organizationsEndpoint]: businessPromise,
          },
        }}
      >
        <NavBar />
        {children}
      </SWRConfig>
    </LayoutContainer>
  );
}
