import GridCardSkeleton from "@/app/ui/GridCardSkeleton";
import GridContainer from "@/app/ui/GridContainer";
import { PageContainer } from "@/app/ui/PageContainer";
import PageHeader from "@/app/ui/PageHeader";
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
