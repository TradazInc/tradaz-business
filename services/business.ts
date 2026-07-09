import { toaster } from "@/components/ui/toaster";
import { authClient } from "@/lib/authClient";
import { businessSchema } from "@/schema/business";

export async function createBusiness(formData: FormData) {
  const form = Object.fromEntries(formData.entries());
  const { data, error } = businessSchema.safeParse(form);

  // validate form
  if (error) {
    toaster.create({
      title: error.issues[0].path,
      description: error.issues[0].message,
      type: "error",
    });
    return;
  }

  const res = await authClient.organization.create({
    ...data,
    metadata: {
      description: data.description,
      phone: data.phone,
      address: data.address,
    },
    keepCurrentActiveOrganization: false,
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

export async function setActiveBussienss(organizationId: string) {
  return authClient.organization.setActive({ organizationId });
}
