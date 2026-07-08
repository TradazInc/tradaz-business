import GridCardSkeleton from "@/app/ui/dashboard/GridCardSkeleton";
import GridContainer from "@/app/ui/dashboard/GridContainer";
import { PageContainer } from "@/app/ui/PageContainer";
import { For } from "@chakra-ui/react";

const loading = () => {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <PageContainer>
      <GridContainer>
        <For each={skeletons}>{() => <GridCardSkeleton />}</For>
      </GridContainer>
    </PageContainer>
  );
};

export default loading;
