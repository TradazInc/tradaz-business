"use client";

import { GoogleIcon } from "@/app/ui/signin/GoogleIcon";
import SeparatorText from "@/app/ui/signin/SeparatorText";
import { PasswordInput } from "@/components/ui/password-input";
import { emailSignUp, googleSignIn } from "@/services/auth";
import { Button, Field, Fieldset, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const SignUpForm = () => {
  const router = useRouter();
  const [isEmailPending, startEmailTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();

  const handleEmailSignup = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startEmailTransition(async () => {
      const data = await emailSignUp(formData);
      if (data) router.push("/dashboard");
    });
  };

  const handleGoogleSignup = () => {
    startGoogleTransition(async () => {
      await googleSignIn();
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
          type={"submit"}
          loading={isEmailPending}
          disabled={isEmailPending}
          w={"full"}
        >
          Sign Up
        </Button>

        <SeparatorText />

        <Button
          onClick={handleGoogleSignup}
          loading={isGooglePending}
          disabled={isGooglePending}
          w={"full"}
        >
          <GoogleIcon />
          <Text>Sign Up With Google</Text>
        </Button>
      </Fieldset.Root>
    </form>
  );
};

export default SignUpForm;
