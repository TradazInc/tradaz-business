"use client";

import { emailSignIn, googleSignIn } from "@/apis/services/auth";
import { GoogleIcon } from "@/components/custom/signin/GoogleIcon";
import SeparatorText from "@/components/custom/signin/SeparatorText";
import { PasswordInput } from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster";
import { emailSignInSchema } from "@/schema/auth";
import { Box, Button, Field, Fieldset, Input, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

const SignInForm = () => {
  const [isGooglePending, startGoogleTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ resolver: zodResolver(emailSignInSchema) });

  const onSubmit = handleSubmit(async (signInData) => {
    const { error } = await emailSignIn(signInData, "/dashboard");
    if (error) {
      toaster.create({
        title: error.code,
        description: error.message,
        type: "error",
      });
    }
  });

  const handleGoogleSignIn = () => {
    startGoogleTransition(async () => {
      const { error } = await googleSignIn("/dashboard");
      if (error) {
        toaster.create({
          title: error.code,
          description: error.message,
          type: "error",
        });
      }
    });
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
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
          w={"full"}
        >
          Sign in
        </Button>

        <SeparatorText>Or</SeparatorText>

        <Button
          onClick={handleGoogleSignIn}
          loading={isGooglePending}
          disabled={isGooglePending}
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
