import { NavBar } from "@/app/ui/dashboard/NavBar";
import { organizationsKey, sessionKey } from "@/data/cacheKeys";
import { getSession } from "@/server/auth";
import { getBusinesses } from "@/server/business";
import { Grid, GridItem } from "@chakra-ui/react";
import { SWRConfig } from "swr";
import { SideBarItems } from "../ui/dashboard/SideDrawer";

export default async function BusinessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionPromise = getSession();
  const businessPromise = getBusinesses();

  return (
    <SWRConfig
      value={{
        fallback: {
          [sessionKey]: sessionPromise,
          [organizationsKey]: businessPromise,
        },
      }}
    >
      <NavBar />
      <Grid
        templateAreas={{
          base: `'main'`,
          lg: ` 'aside main'`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "235px 1fr",
        }}
      >
        <GridItem
          h={"full"}
          area={"aside"}
          hideBelow={"lg"}
          borderRightWidth={"1px"}
          borderColor={"bg.emphasized"}
        >
          <SideBarItems />
        </GridItem>

        <GridItem area={"main"}>{children}</GridItem>
      </Grid>
    </SWRConfig>
  );
}
