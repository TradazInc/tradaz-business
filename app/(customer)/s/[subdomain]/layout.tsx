import { LayoutContainer } from "@/components/shared/LayoutContainer";
import { SESSION_KEY } from "@/data/cacheKeys";
import { getSession } from "@/server/auth";
import { cache } from "@/utilities/cacheKey";
import { Grid, GridItem } from "@chakra-ui/react";
import { unauthorized } from "next/navigation";
import { SWRConfig, unstable_serialize } from "swr";

export default async function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  if (!session.data || session.error) unauthorized();

  return (
    <LayoutContainer>
      <SWRConfig
        value={{
          fallback: {
            [unstable_serialize(cache.key(SESSION_KEY))]: session.data,
          },
        }}
      >
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
            Customer Sidebar
          </GridItem>

          <GridItem area={"main"} overflowY={"auto"}>
            {children}
          </GridItem>
        </Grid>
      </SWRConfig>
    </LayoutContainer>
  );
}
