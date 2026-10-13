import { NavBar } from "@/components/shared/NavBar";
import { LayoutContainer } from "@/components/shared/LayoutContainer";
import { BUSINESS_KEY, SESSION_KEY } from "@/data/cacheKeys";
import { getSession } from "@/server/auth";
import { getBusinesses } from "@/server/business";
import { SWRConfig, unstable_serialize } from "swr";
import { unauthorized } from "next/navigation";
import { getKey } from "@/utilities/computeKey";
import { HStack } from "@chakra-ui/react";
import { SideMenuSectionList } from "@/components/shared/SideMenuSectionList";

export default async function BusinessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [session, businesses] = await Promise.all([
    getSession(),
    getBusinesses().catch(() => undefined),
  ]);
  if (!session.data || session.error) unauthorized();

  return (
    <LayoutContainer>
      <SWRConfig
        value={{
          fallback: {
            [unstable_serialize(getKey(SESSION_KEY))]: session.data,
            [unstable_serialize(getKey(BUSINESS_KEY))]: businesses,
          },
        }}
      >
        <NavBar />
        <HStack h={"full"} w={"full"}>
          <SideMenuSectionList />
          {children}
        </HStack>
      </SWRConfig>
    </LayoutContainer>
  );
}
