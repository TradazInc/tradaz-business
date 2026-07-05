import { toaster } from "@/components/ui/toaster";
import { allowedRoles } from "@/entities/Session";
import { authClient, AuthClient } from "@/lib/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { forbidden, unauthorized } from "next/navigation";
import { emailSignInSchema, emailSignUpSchema } from "./authSchema";

class AuthService {
  constructor(private readonly authClient: AuthClient) {}

  async emailSignUp(formData: FormData, router: AppRouterInstance) {
    const form = Object.fromEntries(formData.entries());
    const { data, error } = emailSignUpSchema.safeParse(form);

    // validate form
    if (error)
      return toaster.create({
        title: error.issues[0].path,
        description: error.issues[0].message,
        type: "error",
      });

    return this.authClient.signUp.email(data, {
      onSuccess: async (ctx) => {
        const session = await this.isAuthorized();
        if (session) router.push("/dashboard");
      },
      onError: ({ error }) => {
        toaster.create({
          title: error.name,
          description: error.message,
          type: "error",
        });
      },
    });
  }

  async emailSignIn(formData: FormData, router: AppRouterInstance) {
    const form = Object.fromEntries(formData.entries());
    const { data, error } = emailSignInSchema.safeParse(form);

    // validate form
    if (error)
      return toaster.create({
        title: error.issues[0].path,
        description: error.issues[0].message,
        type: "error",
      });

    return this.authClient.signIn.email(data, {
      onSuccess: async (ctx) => {
        const session = await this.isAuthorized();
        if (session) router.push("/dashboard");
      },
      onError: ({ error }) => {
        toaster.create({
          title: error.name,
          description: error.message,
          type: "error",
        });
      },
    });
  }

  async googleSignIn(router: AppRouterInstance) {
    return this.authClient.signIn.social(
      { provider: "google" },
      {
        onSuccess: async (ctx) => {
          const session = await this.isAuthorized();
          if (session) router.push("/dashboard");
        },
        onError: ({ error }) => {
          toaster.create({
            title: error.name,
            description: error.message,
            type: "error",
          });
        },
      },
    );
  }

  logout = async (router: AppRouterInstance) => {
    return authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin"); // redirect to login page
        },
      },
    });
  };

  async isAuthorized() {
    const { data: session, error } = await this.authClient.getSession();

    if (error) {
      toaster.create({
        title: error.code,
        description: error.message,
        type: "error",
      });
      return;
    }

    if (!session) unauthorized();

    if (session.member?.role && allowedRoles.includes(session.member?.role)) {
      return session;
    } else {
      forbidden();
    }
  }
}

export const authService = new AuthService(authClient);
