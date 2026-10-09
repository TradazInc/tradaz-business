import { Card, HStack, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const GridCardSkeleton = () => {
  return (
    <Card.Root border={"none"} size={"sm"}>
      <Card.Body gap={2}>
        <HStack>
          <SkeletonCircle size={10} />
          <SkeletonText noOfLines={2} />
        </HStack>
        <SkeletonText noOfLines={1} />
      </Card.Body>
    </Card.Root>
  );
};

export default GridCardSkeleton;
