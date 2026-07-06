import GridCard from "@/app/ui/dashboard/GridCard";
import GridContainer from "@/app/ui/dashboard/GridContainer";
import { PageContainer } from "@/app/ui/PageContainer";
import PageHeader from "@/app/ui/PageHeader";
import Search from "@/app/ui/Search";
import { SideDrawer } from "@/app/ui/SideDrawer";
import ToolBarContainer from "@/app/ui/ToolBarContainer";
import { getBusinesses } from "@/server/business";
import { Button, HStack, VStack } from "@chakra-ui/react";
import Link from "next/link";
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
        <PageHeader>Your Businesses</PageHeader>
        <DashboardToolbar />
        <GridContainer>
          {data.map((business) => (
            <GridCard
              key={business.id}
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
    <ToolBarContainer>
      <HStack>
        <SideDrawer />
        <Suspense>
          <Search placeholder="Search for a business" query="business" />
        </Suspense>
      </HStack>
      <Button size={"xs"} asChild>
        <Link href={'/business/new'}>
          <LuPlus />
          New Business
        </Link>
      </Button>
    </ToolBarContainer>
  );
};
