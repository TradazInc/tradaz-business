import { toaster } from "@/components/ui/toaster";
import { authClient } from "@/lib/authClient";
import { BusinessData } from "@/schema/business";

export async function createBusiness(business: BusinessData) {
  const { data, error } = await authClient.organization.create({
    ...business,
    metadata: { phone: business.phone, address: business.address },
    keepCurrentActiveOrganization: false,
  });

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

export async function setActiveBusiness(organizationId: string) {
  return authClient.organization.setActive({ organizationId });
}

export async function checkBusinessSlug(slug: string) {
  const { data, error } = await authClient.organization.checkSlug({
    slug,
  });

  if (error) {
    toaster.create({
      title: error.code,
      description: error.message,
      type: "error",
    });
    return { status: false }; // return false if error
  }

  return data;
}
