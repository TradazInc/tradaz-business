import { NavBar } from "@/app/ui/dashboard/NavBar";
import { LayoutContainer } from "@/app/ui/LayoutContainer";
import { organizationsEndpoint } from "@/data/businessEndpoint";
import { sessionEndpoint } from "@/data/sessionEndpoint";
import { requireAuthorizedSession } from "@/server/auth";
import { getBusinesses } from "@/server/business";
import { SWRConfig } from "swr";

export default async function BusinessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireAuthorizedSession();
  const businesses = await getBusinesses();

  return (
    <LayoutContainer>
      <SWRConfig
        value={{
          fallback: {
            [sessionEndpoint]: session,
            [organizationsEndpoint]: businesses,
          },
        }}
      >
        <NavBar />
        {children}
      </SWRConfig>
    </LayoutContainer>
  );
}
