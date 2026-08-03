import { authClient } from "@/lib/authClient";
import { EmailSignInData, EmailSignUpData } from "@/schema/auth";

export async function emailSignUp(
  signUpData: EmailSignUpData,
  callbackURL?: string,
) {
  return authClient.signUp.email({ ...signUpData, callbackURL });
}

export async function emailSignIn(
  signInData: EmailSignInData,
  callbackURL?: string,
) {
  return authClient.signIn.email({ ...signInData, callbackURL });
}

export async function googleSignIn(callbackURL?: string) {
  return authClient.signIn.social({ provider: "google", callbackURL });
}

export async function signOut() {
  return authClient.signOut();
}

export async function getSession() {
  return authClient.getSession();
}
