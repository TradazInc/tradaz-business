"use client";

import { GoogleIcon } from "@/components/custom/signin/GoogleIcon";
import SeparatorText from "@/components/custom/signin/SeparatorText";
import { PasswordInput } from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster";
import { emailSignInSchema } from "@/schema/auth";
import { useEmailSignin, useGoogleSignin } from "@/server/hooks/auth";
import { errorToast } from "@/utilities/errorToast";
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
    const { unwrap } = toaster.promise(emailTrigger({ signInData }), {
      loading: { title: "Logging in…", description: "Please wait" },
      success: (session) => ({
        title: "Login successful",
        description: `Welcome ${session.user.name}`,
      }),
    })!;
    try {
      await unwrap();
      push("/dashboard");
    } catch (e) {
      errorToast(e);
    }
  });

  const handleGoogleSignIn = async () => {
    try {
      await trigger("/dashboard");
    } catch (e) {
      errorToast(e);
    }
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
          disabled={!isValid || isSubmitting || emailMutating}
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
