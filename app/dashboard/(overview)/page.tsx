import GridCard from "@/app/components/GridCard";
import GridContainer from "@/app/components/GridContainer";
import { getBusinesses } from "@/server/business";
import { VStack } from "@chakra-ui/react";
import { PageContainer } from "@/app/components/PageContainer";
import Header from "@/app/components/Header";
import ToolBar from "@/app/components/ToolBar";

export default async function page() {
  const { data, error } = await getBusinesses();

  if (error) return null;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <Header />
        <ToolBar />
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
              href={`/business/${business.id}`}
            />
          ))}
        </GridContainer>
      </VStack>
    </PageContainer>
  );
}
