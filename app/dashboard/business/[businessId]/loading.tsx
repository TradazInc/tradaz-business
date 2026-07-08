import GridCardSkeleton from "@/app/ui/dashboard/GridCardSkeleton";
import GridContainer from "@/app/ui/dashboard/GridContainer";
import { For } from "@chakra-ui/react";

const loading = () => {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <GridContainer>
      <For each={skeletons}>{() => <GridCardSkeleton />}</For>
    </GridContainer>
  );
};

export default loading;
