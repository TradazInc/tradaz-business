import { toaster } from "@/components/ui/toaster";
import { AuthClient, authClient } from "@/lib/auth";
import { businessSchema } from "./businessSchema";

class BusinessService {
  constructor(private readonly authClient: AuthClient) {}

  async createBusiness(formData: FormData) {
    const form = Object.fromEntries(formData.entries());
    const { data, error } = businessSchema.safeParse(form);

    // validate form
    if (error)
      return toaster.create({
        title: error.issues[0].path,
        description: error.issues[0].message,
        type: "error",
      });

    return this.authClient.organization.create({
      ...data,
      metadata: {
        description: data.description,
        phone: data.phone,
        address: data.address,
      },
      keepCurrentActiveOrganization: false,
    });
  }

  async setActiveBussienss(organizationId: string) {
    return this.authClient.organization.setActive({ organizationId });
  }

  async getBusinesses() {
    return this.authClient.organization.list();
  }
}

export const businessService = new BusinessService(authClient);
