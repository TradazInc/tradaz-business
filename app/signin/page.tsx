import { Tabs } from "@chakra-ui/react";
import SignUpForm from "../ui/signin/SignUpForm";
import SignInForm from "../ui/signin/SignInForm";

const SigninPage = () => {
  return (
    <Tabs.Root defaultValue="signin">
      <Tabs.List>
        <Tabs.Trigger value="signin" asChild>
          Sign In
        </Tabs.Trigger>
        <Tabs.Trigger value="signup" asChild>
          Sign Up
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="signin">
        <SignInForm />
      </Tabs.Content>
      <Tabs.Content value="signup">
        <SignUpForm />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default SigninPage;
