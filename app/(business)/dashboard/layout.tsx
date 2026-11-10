import { LayoutContainer } from "@/components/shared/LayoutContainer";
import { NavBar } from "@/components/shared/NavBar";
import { SideMenuSectionList } from "@/components/shared/SideMenuSectionList";
import { BUSINESS_KEY, SESSION_KEY } from "@/data/cacheKeys";
import { getSession } from "@/server/auth";
import { getBusinesses } from "@/server/business";
import { cache } from "@/utilities/cacheKey";
import { Grid, GridItem } from "@chakra-ui/react";
import { unauthorized } from "next/navigation";
import { SWRConfig, unstable_serialize } from "swr";

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
            [unstable_serialize(cache.key(SESSION_KEY))]: session.data,
            [unstable_serialize(cache.key(BUSINESS_KEY))]: businesses,
          },
        }}
      >
        <NavBar />
        <Grid
          templateAreas={{ base: `'main'`, lg: ` 'aside main'` }}
          templateColumns={{ base: "1fr", lg: "1fr 5fr" }}
          templateRows={"minmax(0, 1fr)"}
          overflow={"hidden"}
        >
          <GridItem
            area={"aside"}
            hideBelow={"lg"}
            overflowY={"auto"}
            scrollbar={"hidden"}
          >
            <SideMenuSectionList />
          </GridItem>

          <GridItem area={"main"} overflowY={"auto"}>
            {children}
          </GridItem>
        </Grid>
      </SWRConfig>
    </LayoutContainer>
  );
}
