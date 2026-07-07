import { Center, Tabs, VStack } from "@chakra-ui/react";
import { LogoContainer } from "../ui/LogoContainer";
import SignInForm from "../ui/signin/SignInForm";
import SignUpForm from "../ui/signin/SignUpForm";

const SigninPage = () => {
  return (
    <Center h={"dvh"} w={"full"}>
      <VStack gap={8}>
        <LogoContainer>Tradaz</LogoContainer>
        <Tabs.Root
          w={"lg"}
          fitted
          defaultValue={"signin"}
          variant={"plain"}
          css={{
            "--tabs-indicator-bg": "colors.gray.subtle",
            "--tabs-indicator-shadow": "shadows.xs",
            "--tabs-trigger-radius": "radii.full",
          }}
        >
          <Tabs.List>
            <Tabs.Trigger value="signin">Sign In</Tabs.Trigger>
            <Tabs.Trigger value="signup">Sign Up</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>

          <Tabs.Content value="signin">
            <SignInForm />
          </Tabs.Content>
          <Tabs.Content value="signup">
            <SignUpForm />
          </Tabs.Content>
        </Tabs.Root>
      </VStack>
    </Center>
  );
};

export default SigninPage;
