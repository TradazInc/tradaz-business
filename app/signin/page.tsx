import SignInForm from "@/components/signin/SignInForm";
import SignUpForm from "@/components/signin/SignUpForm";
import TradazLogo from "@/components/shared/TradazLogo";
import { Center, Tabs, VStack } from "@chakra-ui/react";
import { IoCreateOutline } from "react-icons/io5";
import { IoIosLogIn } from "react-icons/io";

const SigninPage = () => {
  return (
    <Center h={"dvh"} w={"full"}>
      <VStack gap={8}>
        <TradazLogo />
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
            <Tabs.Trigger value="signin">
              <IoIosLogIn />
              Sign In
            </Tabs.Trigger>
            <Tabs.Trigger value="signup">
              <IoCreateOutline />
              Sign Up
            </Tabs.Trigger>
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
