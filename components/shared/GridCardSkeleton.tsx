import { Card, HStack, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const GridCardSkeleton = () => {
  return (
    <Card.Root border={"none"} size={"sm"}>
      <Card.Body asChild>
        <HStack>
          <SkeletonCircle size={10} />
          <SkeletonText noOfLines={3} />
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};

export default GridCardSkeleton;
