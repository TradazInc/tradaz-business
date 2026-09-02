import { authClient } from "@/lib/authClient";

export type Business = typeof authClient.$Infer.Organization;
export type ActiveBusiness = typeof authClient.$Infer.ActiveOrganization;
