import { Center, For, Skeleton, SkeletonText, VStack } from "@chakra-ui/react";

const loading = () => {
  const skeletons = [1, 2, 3, 4, 5, 6, 7];

  return (
    <Center h={"full"} w={"full"}>
      <VStack
        w={"full"}
        maxW={{ base: "full", md: "2xl", xl: "4xl" }}
        mx={"auto"}
        px={{ base: 4, md: 0 }}
        gap={10}
      >
        <Skeleton w={"160px"} h={10} alignSelf={"flex-start"} />
        <For each={skeletons}>
          {() => <SkeletonText noOfLines={2} gap={"4"} />}
        </For>
      </VStack>
    </Center>
  );
};

export default loading;
