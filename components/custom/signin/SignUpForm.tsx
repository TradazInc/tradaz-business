"use client";

import { emailSignUp, googleSignIn } from "@/apis/client/auth";
import { GoogleIcon } from "@/components/custom/signin/GoogleIcon";
import SeparatorText from "@/components/custom/signin/SeparatorText";
import { PasswordInput } from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster";
import { emailSignUpSchema } from "@/schema/auth";
import { Button, Field, Fieldset, Input, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
  const [isGooglePending, startGoogleTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ resolver: zodResolver(emailSignUpSchema) });

  const onSubmit = handleSubmit(async (signUpData) => {
    const { data, error } = await emailSignUp(signUpData);

    if (data) {
      router.push("/dashboard?signup=true"); // review after emailVerification
    } else {
      toaster.create({
        title: error.code,
        description: error.message,
        type: "error",
      });
    }
  });

  const handleGoogleSignup = () => {
    startGoogleTransition(async () => {
      const { error } = await googleSignIn("/dashboard?signup=true");

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
