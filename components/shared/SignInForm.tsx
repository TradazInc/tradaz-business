"use client";

import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster";
import { useEmailSignin, useGoogleSignin } from "@/hooks/auth";
import { EmailSignInSchema } from "@/schema/auth";
import { computePath } from "@/utilities/computePath";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { Box, Button, Field, Fieldset, Input, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Options, passwordStrength } from "check-password-strength";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import SeparatorText from "./SeparatorText";

const strengthOptions: Options<string> = [
  { id: 1, value: "weak", minDiversity: 0, minLength: 0 },
  { id: 2, value: "medium", minDiversity: 2, minLength: 6 },
  { id: 3, value: "strong", minDiversity: 3, minLength: 8 },
  { id: 4, value: "very-strong", minDiversity: 4, minLength: 10 },
];

const SignInForm = () => {
  const { trigger: emailTrigger, isMutating: emailMutating } = useEmailSignin();
  const { trigger, isMutating } = useGoogleSignin();
  const { push } = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ resolver: zodResolver(EmailSignInSchema) });

  const password = useWatch({ control, name: "password" });

  const strength = useMemo(() => {
    if (!password) return 0;
    const result = passwordStrength(password, strengthOptions);
    return result.id;
  }, [password]);

  const onSubmit = handleSubmit(async (signInData) => {
    const promise = toaster.promise(emailTrigger({ signInData }), {
      loading: { title: "Logging in…", description: "Please wait" },
      success: (session) => ({
        title: "Login successful",
        description: `Welcome ${session.user.name}`,
      }),
      error: errorToastOptions,
    });
    if (!promise) return;
    try {
      await promise.unwrap();
      push(computePath());
    } catch {} // Error displayed by toaster
  });

  const handleGoogleSignIn = async () => {
    const promise = toaster.promise(trigger(computePath()), {
      loading: { title: "Redirecting…", description: "Please wait" },
      success: {
        title: "Redirect successful",
        description: "Continue with Google",
      },
      error: errorToastOptions,
    });
    if (!promise) return;
    try {
      await promise.unwrap();
    } catch {} // Error displayed by toaster
  };

  return (
    <Fieldset.Root size={"lg"} maxW={"lg"}>
      <Fieldset.Content>
        <Field.Root required invalid={!!errors.email}>
          <Field.Label>Email Address</Field.Label>
          <Input type="email" {...register("email")} />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root required invalid={!!errors.password}>
          <Field.Label>Password</Field.Label>
          <PasswordInput {...register("password")} />
          <PasswordStrengthMeter value={strength} />
          <Field.HelperText>Minimum 5 characters</Field.HelperText>
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>
      </Fieldset.Content>
      <Box textAlign="right" w="full">
        <Link href={"#"}>Forgot Password?</Link>
      </Box>
      <Button
        onClick={onSubmit}
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
        <FcGoogle />
        <Text>Sign In With Google</Text>
      </Button>
    </Fieldset.Root>
  );
};

export default SignInForm;
