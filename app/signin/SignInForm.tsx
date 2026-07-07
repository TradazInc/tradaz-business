"use client";

import { emailSignIn, googleSignIn } from "@/services/auth";
import {
  Box,
  Button,
  Field,
  Fieldset,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { PasswordInput } from "@/components/ui/password-input";
import { GoogleIcon } from "@/app/ui/auth/GoogleIcon";
import LinkText from "@/app/ui/auth/LinkText";
import SeparatorText from "@/app/ui/auth/SeparatorText";

const SignInForm = () => {
  const router = useRouter();
  const [isEmailPending, startEmailTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();

  const handleEmailSignin = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startEmailTransition(async () => {
      await emailSignIn(formData, router);
    });
  };

  const handleGoogleSignIn = () => {
    startGoogleTransition(async () => {
      await googleSignIn(router);
    });
  };

  return (
    <Fieldset.Root size="lg" maxW="lg" onSubmit={handleEmailSignin}>
      <Fieldset.Root size="lg" maxW="lg">
        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Email Address</Field.Label>
            <Input name="email" type="email" />
          </Field.Root>

          <Field.Root>
            <Field.Label>Password</Field.Label>
            <PasswordInput name="password" />
          </Field.Root>

          <Box textAlign="right" w="full">
            <LinkText>Forgot Password?</LinkText>
          </Box>
        </Fieldset.Content>

        <Button
          type="submit"
          alignSelf="flex-start"
          loading={isEmailPending}
          loadingText="Signing in..."
          disabled={isEmailPending}
        >
          Sign in
        </Button>

        <SeparatorText />

        <Button
          type="button"
          alignSelf="flex-start"
          onClick={handleGoogleSignIn}
          loading={isGooglePending}
          disabled={isGooglePending}
        >
          <GoogleIcon />
          <Text>Sign In With Google</Text>
        </Button>

        <HStack alignItems="center">
          <Text>Don’t have an account?</Text>
          <LinkText>Sign Up</LinkText>
        </HStack>
      </Fieldset.Root>
    </Fieldset.Root>
  );
};

export default SignInForm;
