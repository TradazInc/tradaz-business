import { Flex, VStack } from "@chakra-ui/react";
import { LogoContainer } from "../components/LogoContainer";
import SignInForm from "./SignInForm";
import SignInHeader from "../components/auth/SignInHeader";
import SigninSidePanel from "../components/auth/SigninSidePanel";

const SigninPage = () => {
  return (
    <Flex
      minH="100vh"
      w="full"
      bg="bg.subtle"
      align="center"
      justify="center"
      p={4}
    >
      <VStack w="full" maxW="1000px" align="flex-start" gap={4}>
        <Flex
          w="full"
          h={{ base: "auto", lg: "min(650px, 85vh)" }}
          bg="bg.muted"
          rounded="2xl"
          overflow="hidden"
          boxShadow="0 25px 50px -12px rgba(0,0,0,0.5)"
          border="1px solid"
          borderColor="whiteAlpha.100"
          direction={{ base: "column", lg: "row" }}
        >
          <SigninSidePanel
            heading={"Hello, Friend!"}
            action={"SIGN IN"}
            prompt={
              "Enter your personal details and start your journey with us"
            }
          />
          <Flex
            flex={1}
            align="center"
            justify="center"
            p={{ base: 6, md: 8 }}
            overflowY="auto"
            css={{
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
            }}
          >
            <VStack w="full" maxW="400px" gap="20px" marginX="auto">
              <LogoContainer>Tradaz</LogoContainer>
              <SignInHeader
                heading="Sign In"
                prompt="Enter your credentials to access your account."
              />
              <SignInForm />
            </VStack>
          </Flex>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default SigninPage;
