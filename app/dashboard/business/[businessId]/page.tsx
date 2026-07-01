import GridCard from "@/app/components/GridCard";
import GridContainer from "@/app/components/GridContainer";
import Header from "@/app/components/Header";
import { PageContainer } from "@/app/components/PageContainer";
import Search from "@/app/components/Search";
import { SideDrawer } from "@/app/components/SideDrawer";
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
        <Header text={`${data.name} Stores`} />
        <BusinessToolbar />
        <GridContainer>
          {data.teams.map((store) => (
            <GridCard
              key={store.id}
              id={store.id}
              name={store.name}
              address={store.address}
              createdAt={new Date(store.createdAt).toDateString()}
              href={`/dashboard/business/${store.id}`}
            />
          ))}
        </GridContainer>
      </VStack>
    </PageContainer>
  );
}

const BusinessToolbar = () => {
  return (
    <HStack w={"full"} justify={"space-between"}>
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
    </HStack>
  );
};
