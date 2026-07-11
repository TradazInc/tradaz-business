"use client";

import { GoogleIcon } from "@/app/ui/signin/GoogleIcon";
import SeparatorText from "@/app/ui/signin/SeparatorText";
import { PasswordInput } from "@/components/ui/password-input";
import { emailSignIn, googleSignIn } from "@/services/auth";
import { Box, Button, Field, Fieldset, Input, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useTransition } from "react";

const SignInForm = () => {
  const [isEmailPending, startEmailTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();

  const handleEmailSignin = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startEmailTransition(async () => {
      await emailSignIn(formData);
    });
  };

  const handleGoogleSignIn = () => {
    startGoogleTransition(async () => {
      await googleSignIn("/dashboard");
    });
  };

  return (
    <form onSubmit={handleEmailSignin}>
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
        </Fieldset.Content>
        <Box textAlign="right" w="full">
          <Link href={"#"}>Forgot Password?</Link>
        </Box>
        <Button
          type={"submit"}
          loading={isEmailPending}
          disabled={isEmailPending}
          w={"full"}
        >
          Sign in
        </Button>
        <SeparatorText />
        <Button
          onClick={handleGoogleSignIn}
          loading={isGooglePending}
          disabled={isGooglePending}
          w={"full"}
        >
          <GoogleIcon />
          <Text>Sign In With Google</Text>
        </Button>{" "}
      </Fieldset.Root>
    </form>
  );
};

export default SignInForm;
