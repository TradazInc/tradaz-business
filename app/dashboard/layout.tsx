import { NavBar } from "@/app/ui/dashboard/NavBar";
import { LayoutContainer } from "@/app/ui/LayoutContainer";
import { organizationsEndpoint } from "@/data/businessEndpoint";
import { getBusinesses } from "@/server/business";
import { SWRConfig } from "swr";

export default async function BusinessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const businessesPromise = getBusinesses();

  return (
    <LayoutContainer>
      <SWRConfig
        value={{
          fallback: { [organizationsEndpoint]: businessesPromise }, // Pass the promises to client components.
        }}
      >
        <NavBar />
        {children}
      </SWRConfig>
    </LayoutContainer>
  );
}
