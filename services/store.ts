import { toaster } from "@/components/ui/toaster";
import { authClient } from "@/lib/auth";
import { storeSchema } from "@/schema/store";

export async function setActiveStore(teamId: string) {
  return authClient.organization.setActiveTeam({ teamId });
}

export async function createStore(formData: FormData) {
  const form = Object.fromEntries(formData.entries());
  const { data, error } = storeSchema.safeParse(form);

  // validate form
  if (error) {
    return toaster.create({
      title: error.issues[0].path,
      description: error.issues[0].message,
      type: "error",
    });
  }

  return authClient.organization.createTeam({ ...data });
}
