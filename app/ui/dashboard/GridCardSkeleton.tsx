import { Card, HStack, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const GridCardSkeleton = () => {
  return (
    <Card.Root>
      <HStack gap={"3"} p={3}>
        <SkeletonCircle size={"10"} />
        <SkeletonText noOfLines={2} />
      </HStack>
    </Card.Root>
  );
};

export default GridCardSkeleton;
