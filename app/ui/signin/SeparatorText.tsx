import { HStack, Separator, Text } from "@chakra-ui/react";

const SeparatorText = ({ children }: { children: React.ReactNode }) => {
  return (
    <HStack w={"full"}>
      <Separator flex="1" variant="solid" size="md" />
      <Text
        flexShrink="0"
        fontWeight={"400"}
        fontSize={"17.25px"}
        lineHeight={"25.87px"}
        letterSpacing={"-0.11px"}
        color={"bg.inverted"}
      >
        {children}
      </Text>
      <Separator flex="1" variant="solid" size="md" />
    </HStack>
  );
};

export default SeparatorText;
