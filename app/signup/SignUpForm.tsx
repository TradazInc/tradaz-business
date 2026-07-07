"use client";

import { emailSignUp, googleSignIn } from "@/services/auth";
import { Button, HStack, Input, Text, Field, Fieldset } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { PasswordInput } from "@/components/ui/password-input";
import { GoogleIcon } from "@/app/ui/auth/GoogleIcon";
import LinkText from "@/app/ui/auth/LinkText";
import SeparatorText from "@/app/ui/auth/SeparatorText";

const SignUpForm = () => {
  const router = useRouter();
  const [isEmailPending, startEmailTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();

  const handleEmailSignup = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startEmailTransition(async () => {
      await emailSignUp(formData, router);
    });
  };

  const handleGoogleSignup = () => {
    startGoogleTransition(async () => {
      await googleSignIn(router);
    });
  };

  return (
    <form onSubmit={handleEmailSignup}>
      <Fieldset.Root size="lg" maxW="lg">
        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Full Name</Field.Label>
            <Input name="name" />
          </Field.Root>

          <Field.Root>
            <Field.Label>Email Address</Field.Label>
            <Input name="email" type="email" />
          </Field.Root>

          <Field.Root>
            <Field.Label>Password</Field.Label>
            <PasswordInput name="password" />
          </Field.Root>
        </Fieldset.Content>

        <Button
          type="submit"
          alignSelf="flex-start"
          loading={isEmailPending}
          loadingText="Signing up..."
          disabled={isEmailPending}
        >
          Sign Up
        </Button>

        <SeparatorText />

        <Button
          type="button"
          alignSelf="flex-start"
          onClick={handleGoogleSignup}
          loading={isGooglePending}
          disabled={isGooglePending}
        >
          <GoogleIcon />
          <Text>Sign Up With Google</Text>
        </Button>

        <HStack alignItems="center">
          <Text>Already have an account?</Text>
          <LinkText>Sign In</LinkText>
        </HStack>
      </Fieldset.Root>
    </form>
  );
};

export default SignUpForm;
