import { Text, VStack } from "@chakra-ui/react";

interface Props {
  heading: string;
  prompt: string;
}

const SignInHeader = ({ heading, prompt }: Props) => {
  return (
    <VStack w="full" textAlign="center">
      <Text
        fontWeight={"700"}
        fontSize={"40px"}
        lineHeight="47.42px"
        letterSpacing="-2%"
        color="bg.inverted"
      >
        {heading}
      </Text>
      <Text fontWeight={"400"} fontSize="14px" color="#8E9BAE">
        {prompt}
      </Text>
    </VStack>
  );
};

export default SignInHeader;
