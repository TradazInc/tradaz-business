import { Card, Skeleton } from "@chakra-ui/react";

const GridCardSkeleton = () => {
  return (
    <Card.Root size={"sm"}>
      <Skeleton w={"full"} h={"full"} />
    </Card.Root>
  );
};

export default GridCardSkeleton;
