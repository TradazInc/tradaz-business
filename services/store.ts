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
    toaster.create({
      title: error.issues[0].path[0],
      description: error.issues[0].message,
      type: "error",
    });
    return;
  }

  const res = await authClient.organization.createTeam({ ...data });

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
