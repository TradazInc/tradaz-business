import { toaster } from "@/components/ui/toaster";
import { authClient } from "@/lib/authClient";
import { EmailSignInData, EmailSignUpData } from "@/schema/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function emailSignUp(
  signUpData: EmailSignUpData,
  callbackURL?: string,
) {
  const { data, error } = await authClient.signUp.email(
    { ...signUpData, callbackURL },
    {
      onError: ({ error }) => {
        toaster.create({
          title: error.name,
          description: error.message,
          type: "error",
        });
      },
    },
  );

  if (error) {
    toaster.create({
      title: error.code,
      description: error.message,
      type: "error",
    });
    return;
  }

  return data;
}

export async function emailSignIn(
  signInData: EmailSignInData,
  callbackURL?: string,
) {
  const { data, error } = await authClient.signIn.email(
    { ...signInData, callbackURL },
    {
      onError: ({ error }) => {
        toaster.create({
          title: error.name,
          description: error.message,
          type: "error",
        });
      },
    },
  );

  if (error) {
    toaster.create({
      title: error.code,
      description: error.message,
      type: "error",
    });
    return;
  }

  return data;
}

export async function googleSignIn(callbackURL?: string) {
  const { data, error } = await authClient.signIn.social(
    { provider: "google", callbackURL },
    {
      onError: ({ error }) => {
        toaster.create({
          title: error.name,
          description: error.message,
          type: "error",
        });
      },
    },
  );

  if (error) {
    toaster.create({
      title: error.code,
      description: error.message,
      type: "error",
    });
    return;
  }

  return data;
}

export async function logout(router: AppRouterInstance) {
  return authClient.signOut({
    fetchOptions: {
      onSuccess: () => router.push("/signin"),
    },
  });
}
