import { Card, HStack, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const GridCardSkeleton = () => {
  return (
    <Card.Root border={"none"}>
      <HStack gap={3} p={3}>
        <SkeletonCircle size={10} />
        <SkeletonText noOfLines={2} />
      </HStack>
      <SkeletonText noOfLines={1} m={3}/>
    </Card.Root>
  );
};

export default GridCardSkeleton;
