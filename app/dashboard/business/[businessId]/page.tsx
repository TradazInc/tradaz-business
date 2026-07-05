import GridCard from "@/app/ui/dashboard/GridCard";
import GridContainer from "@/app/ui/dashboard/GridContainer";
import { PageContainer } from "@/app/ui/PageContainer";
import PageHeader from "@/app/ui/PageHeader";
import Search from "@/app/ui/Search";
import { SideDrawer } from "@/app/ui/SideDrawer";
import ToolBarContainer from "@/app/ui/ToolBarContainer";
import { getBusiness } from "@/server/business";
import { Button, HStack, VStack } from "@chakra-ui/react";
import { Suspense } from "react";
import { LuPlus } from "react-icons/lu";

interface Props {
  params: Promise<{ businessId: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const { data, error } = await getBusiness(businessId);

  if (error) return null;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>{`${data.name} Stores`}</PageHeader>
        <BusinessToolbar />
        <GridContainer>
          {data.teams.map((store) => (
            <GridCard
              key={store.id}
              name={store.name}
              address={store.address}
              createdAt={new Date(store.createdAt).toDateString()}
              href={`/dashboard/store/${store.id}`}
            />
          ))}
        </GridContainer>
      </VStack>
    </PageContainer>
  );
}

const BusinessToolbar = () => {
  return (
    <ToolBarContainer>
      <HStack>
        <SideDrawer />
        <Suspense>
          <Search placeholder="Search for a store" query="store" />
        </Suspense>
      </HStack>
      <Button size={"xs"}>
        <LuPlus />
        New Store
      </Button>
    </ToolBarContainer>
  );
};
