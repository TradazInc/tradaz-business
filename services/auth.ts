import { toaster } from "@/components/ui/toaster";
import { authClient } from "@/lib/authClient";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { emailSignInSchema, emailSignUpSchema } from "@/schema/auth";

export async function emailSignUp(formData: FormData) {
  const form = Object.fromEntries(formData.entries());
  const { data, error } = emailSignUpSchema.safeParse(form);

  // validate form
  if (error) {
    toaster.create({
      title: error.issues[0].path,
      description: error.issues[0].message,
      type: "error",
    });
    return;
  }

  const res = await authClient.signUp.email(data, {
    onError: ({ error }) => {
      toaster.create({
        title: error.name,
        description: error.message,
        type: "error",
      });
    },
  });

  if (res.error) {
    toaster.create({
      title: res.error.code,
      description: res.error.message,
      type: "error",
    });
    return;
  }

  return res.data;
}

export async function emailSignIn(formData: FormData) {
  const form = Object.fromEntries(formData.entries());
  const { data, error } = emailSignInSchema.safeParse(form);

  // validate form
  if (error) {
    toaster.create({
      title: error.issues[0].path,
      description: error.issues[0].message,
      type: "error",
    });
    return;
  }

  const res = await authClient.signIn.email(data, {
    onError: ({ error }) => {
      toaster.create({
        title: error.name,
        description: error.message,
        type: "error",
      });
    },
  });

  if (res.error) {
    toaster.create({
      title: res.error.code,
      description: res.error.message,
      type: "error",
    });
    return;
  }

  return res.data;
}

export async function googleSignIn() {
  const res = await authClient.signIn.social(
    { provider: "google" },
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

  if (res.error) {
    toaster.create({
      title: res.error.code,
      description: res.error.message,
      type: "error",
    });
    return;
  }

  return res.data;
}

export async function logout(router: AppRouterInstance) {
  return authClient.signOut({
    fetchOptions: {
      onSuccess: () => router.push("/signin"),
    },
  });
}
