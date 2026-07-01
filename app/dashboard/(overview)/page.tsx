import GridCard from "@/app/components/dashboard/GridCard";
import GridContainer from "@/app/components/dashboard/GridContainer";
import Header from "@/app/components/Header";
import { PageContainer } from "@/app/components/PageContainer";
import Search from "@/app/components/Search";
import { SideDrawer } from "@/app/components/SideDrawer";
import { getBusinesses } from "@/server/business";
import { Button, HStack, VStack } from "@chakra-ui/react";
import { Suspense } from "react";
import { LuPlus } from "react-icons/lu";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function page({ searchParams }: Props) {
  const name = (await searchParams).business as string;
  const { data, error } = await getBusinesses(name);

  if (error) return null;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <Header text="Your Businesses" />
        <DashboardToolbar />
        <GridContainer>
          {data.map((business) => (
            <GridCard
              key={business.id}
              id={business.id}
              name={business.name}
              address={business.metadata.address}
              logo={business.logo}
              createdAt={new Date(business.createdAt).toDateString()}
              description={business.metadata.description}
              href={`/dashboard/business/${business.id}`}
            />
          ))}
        </GridContainer>
      </VStack>
    </PageContainer>
  );
}

const DashboardToolbar = () => {
  return (
    <HStack w={"full"} justify={"space-between"}>
      <HStack>
        <SideDrawer />
        <Suspense>
          <Search placeholder="Search for a business" query="business" />
        </Suspense>
      </HStack>
      <Button size={"xs"}>
        <LuPlus />
        New Business
      </Button>
    </HStack>
  );
};
