import GridCardSkeleton from "@/components/custom/GridCardSkeleton";
import GridContainer from "@/components/custom/GridContainer";
import { PageContainer } from "@/components/custom/PageContainer";
import PageHeader from "@/components/custom/PageHeader";
import { For, Skeleton, VStack } from "@chakra-ui/react";

const loading = () => {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>
          <Skeleton w={"160px"} h={10} />
        </PageHeader>
        <GridContainer>
          <For each={skeletons}>
            {(skeleton) => <GridCardSkeleton key={skeleton} />}
          </For>
        </GridContainer>
      </VStack>
    </PageContainer>
  );
};

export default loading;
