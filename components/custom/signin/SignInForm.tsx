"use client";

import { GoogleIcon } from "@/components/custom/signin/GoogleIcon";
import SeparatorText from "@/components/custom/signin/SeparatorText";
import { PasswordInput } from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster";
import { emailSignInSchema } from "@/schema/auth";
import { useEmailSignin, useGoogleSignin } from "@/server/hooks/auth";
import { errorOptions } from "@/utilities/errorToastOptions";
import { Box, Button, Field, Fieldset, Input, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const SignInForm = () => {
  const { trigger: emailTrigger, isMutating: emailMutating } = useEmailSignin();
  const { trigger, isMutating } = useGoogleSignin();
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ resolver: zodResolver(emailSignInSchema) });

  const onSubmit = handleSubmit(async (signInData) => {
    const promise = toaster.promise(emailTrigger({ signInData }), {
      loading: { title: "Logging in…", description: "Please wait" },
      success: (session) => ({
        title: "Login successful",
        description: `Welcome ${session.user.name}`,
      }),
      error: errorOptions,
    });
    if (!promise) return;
    try {
      await promise.unwrap();
      push("/dashboard");
    } catch {} // Error displayed by toaster
  });

  const handleGoogleSignIn = async () => {
    const promise = toaster.promise(trigger("/dashboard"), {
      loading: { title: "Redirecting…", description: "Please wait" },
      success: {
        title: "Redirect successful",
        description: "Continue with Google",
      },
      error: errorOptions,
    });
    if (!promise) return;
    try {
      await promise.unwrap();
    } catch {} // Error displayed by toaster
  };

  return (
    <form onSubmit={onSubmit}>
      <Fieldset.Root size="lg" maxW="lg">
        <Fieldset.Content>
          <Field.Root required invalid={!!errors.email}>
            <Field.Label>Email Address</Field.Label>
            <Input type="email" {...register("email")} />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={!!errors.password}>
            <Field.Label>Password</Field.Label>
            <PasswordInput {...register("password")} />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>
        <Box textAlign="right" w="full">
          <Link href={"#"}>Forgot Password?</Link>
        </Box>
        <Button
          type={"submit"}
          loading={emailMutating}
          disabled={!isValid || isSubmitting || emailMutating || isMutating}
          w={"full"}
        >
          Sign In
        </Button>

        <SeparatorText>Or</SeparatorText>

        <Button
          type={"button"}
          onClick={handleGoogleSignIn}
          loading={isMutating}
          disabled={isMutating || emailMutating}
          w={"full"}
        >
          <GoogleIcon />
          <Text>Sign In With Google</Text>
        </Button>
      </Fieldset.Root>
    </form>
  );
};

export default SignInForm;
