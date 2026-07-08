import { Center, For, SkeletonText, VStack } from "@chakra-ui/react";

const loading = () => {
  const skeletons = [1, 2, 3, 4];

  return (
    <Center h={"full"} w={"full"}>
      <VStack
        w={"full"}
        maxW={{ base: "full", md: "2xl", xl: "4xl" }}
        mx={"auto"}
        px={{ base: 4, md: 0 }}
        gap={10}
      >
        <For each={skeletons}>
          {() => <SkeletonText noOfLines={2} gap={"4"} />}
        </For>
      </VStack>
    </Center>
  );
};

export default loading;
