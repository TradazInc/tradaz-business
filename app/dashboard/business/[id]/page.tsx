import GridCard from "@/app/components/GridCard";
import GridContainer from "@/app/components/GridContainer";
import Header from "@/app/components/Header";
import { PageContainer } from "@/app/components/PageContainer";
import ToolBar from "@/app/components/ToolBar";
import { getStores } from "@/server/store";
import { VStack } from "@chakra-ui/react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: Props) {
  const { id } = await params;
  const { data, error } = await getStores(id);

  if (error) return null;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <Header />
        <ToolBar />
        <GridContainer>
          {data.map((store) => (
            <GridCard
              key={store.id}
              id={store.id}
              name={store.name}
              address={store.address}
              createdAt={new Date(store.createdAt).toDateString()}
              href={`/business/${store.id}`}
            />
          ))}
        </GridContainer>
      </VStack>
    </PageContainer>
  );
}
