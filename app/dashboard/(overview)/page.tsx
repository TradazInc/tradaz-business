import GridCard from "@/app/components/GridCard";
import GridContainer from "@/app/components/GridContainer";
import { businessService } from "@/services/business/businessService";
import { VStack } from "@chakra-ui/react";
import { PageContainer } from "@/app/components/PageContainer";
import Header from "./Header";
import ToolBar from "./ToolBar";

export default async function page() {
  const { data, error } = await businessService.getBusinesses();

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
              name={business.name}
              address={business.metadata.address}
              logo={business.logo}
              createdAt={new Date(business.createdAt).toDateString()}
              description={business.metadata.description}
            />
          ))}
        </GridContainer>
      </VStack>
    </PageContainer>
  );
}
