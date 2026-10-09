import { Card, HStack, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const GridCardSkeleton = () => {
  return (
    <Card.Root border={"none"} size={"sm"}>
      <Card.Body gap={0}>
        <HStack>
          <SkeletonCircle size={10} />
          <SkeletonText noOfLines={2} />
        </HStack>
        <SkeletonText noOfLines={1} mt={2} />
      </Card.Body>
    </Card.Root>
  );
};

export default GridCardSkeleton;
