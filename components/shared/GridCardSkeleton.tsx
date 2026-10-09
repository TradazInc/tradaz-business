import { Card, HStack, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const GridCardSkeleton = () => {
  return (
    <Card.Root border={"none"} size={"sm"}>
      <Card.Body gap={0}>
        <HStack gap={3}>
          <SkeletonCircle size={10} />
          <SkeletonText noOfLines={2} />
        </HStack>
        <Card.Description my={2}>
          <SkeletonText noOfLines={1} />
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
};

export default GridCardSkeleton;
