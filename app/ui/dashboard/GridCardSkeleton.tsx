import { Card, HStack, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const GridCardSkeleton = () => {
  return (
    <Card.Root h={14} w={80}>
      <HStack width={"full"} gap={"3"}>
        <SkeletonCircle size={"10"} />
        <SkeletonText noOfLines={2} />
      </HStack>
    </Card.Root>
  );
};

export default GridCardSkeleton;
