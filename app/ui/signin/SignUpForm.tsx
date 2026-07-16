"use client";

import { GoogleIcon } from "@/app/ui/signin/GoogleIcon";
import SeparatorText from "@/app/ui/signin/SeparatorText";
import { PasswordInput } from "@/components/ui/password-input";
import { emailSignUpSchema } from "@/schema/auth";
import { emailSignUp, googleSignIn } from "@/services/auth";
import { Button, Field, Fieldset, Input, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
  const { push } = useRouter();
  const [isGooglePending, startGoogleTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ resolver: zodResolver(emailSignUpSchema) });

  const onSubmit = handleSubmit(async (signUpData) => {
    const data = await emailSignUp(signUpData);
    if (data) push("/dashboard?signup=true"); // review after emailVerification
  });

  const handleGoogleSignup = () => {
    startGoogleTransition(async () => {
      await googleSignIn("/dashboard?signup=true");
    });
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
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
          w={"full"}
        >
          Sign Up
        </Button>

        <SeparatorText>Or</SeparatorText>

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
