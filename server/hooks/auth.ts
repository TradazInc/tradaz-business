import useSWRMutation from "swr/mutation";
import { authClient } from "@/lib/authClient";
import { EmailSignInData, EmailSignUpData } from "@/schema/auth";
import { SESSION_KEY } from "@/data/cacheKeys";

export const useEmailSignup = () => {
  return useSWRMutation(
    [SESSION_KEY],
    (
      key,
      { arg }: { arg: { signUpData: EmailSignUpData; callbackURL?: string } },
    ) =>
      authClient.signUp.email({
        ...arg.signUpData,
        callbackURL: arg.callbackURL,
        fetchOptions: { throw: true },
      }),
  );
};

export const useEmailSignin = () => {
  return useSWRMutation(
    [SESSION_KEY],
    (
      key,
      { arg }: { arg: { signInData: EmailSignInData; callbackURL?: string } },
    ) =>
      authClient.signIn.email({
        ...arg.signInData,
        callbackURL: arg.callbackURL,
        fetchOptions: { throw: true },
      }),
  );
};

export const useGoogleSignin = () => {
  return useSWRMutation([SESSION_KEY], (key, { arg }: { arg?: string }) =>
    authClient.signIn.social({
      provider: "google",
      callbackURL: arg,
      fetchOptions: { throw: true },
    }),
  );
};

export const useSignOut = () => {
  return useSWRMutation([SESSION_KEY], (key, { arg }: { arg?: null }) =>
    authClient.signOut({ fetchOptions: { throw: true } }),
  );
};
