"use client";

import { GoogleIcon } from "@/components/custom/signin/GoogleIcon";
import SeparatorText from "@/components/custom/signin/SeparatorText";
import { PasswordInput } from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster";
import { emailSignUpSchema } from "@/schema/auth";
import { useEmailSignup, useGoogleSignin } from "@/hooks/auth";
import { computePath } from "@/utilities/computePath";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { Button, Field, Fieldset, Input, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
  const { trigger: emailTrigger, isMutating: emailMutating } = useEmailSignup();
  const { trigger, isMutating } = useGoogleSignin();
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ resolver: zodResolver(emailSignUpSchema) });

  const onSubmit = handleSubmit(async (signUpData) => {
    const promise = toaster.promise(emailTrigger({ signUpData }), {
      loading: { title: "Signing up…", description: "Please wait" },
      success: (session) => ({
        title: "Signup successful",
        description: `Welcome ${session.user.name}`,
      }),
      error: errorToastOptions,
    });
    if (!promise) return;
    try {
      await promise.unwrap();
      push(`${computePath({})}?signup=true`); // review after emailVerification
    } catch {} // Error displayed by toaster
  });

  const handleGoogleSignup = async () => {
    const promise = toaster.promise(trigger(`${computePath({})}?signup=true`), {
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
    <form onSubmit={onSubmit}>
      <Fieldset.Root size="lg" maxW="lg">
        <Fieldset.Content>
          <Field.Root required invalid={!!errors.name}>
            <Field.Label>Full Name</Field.Label>
            <Input {...register("name")} />
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>

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

        <Button
          type={"submit"}
          loading={emailMutating}
          disabled={!isValid || isSubmitting || emailMutating || isMutating}
          w={"full"}
        >
          Sign Up
        </Button>

        <SeparatorText>Or</SeparatorText>

        <Button
          type={"button"}
          onClick={handleGoogleSignup}
          loading={isMutating}
          disabled={isMutating || emailMutating}
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
