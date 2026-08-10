import { ProductStatus } from "@/server/entities/product";

export const statusMap: Record<
  ProductStatus,
  { label: string; color: "red" | "orange" | "green" }
> = {
  approved: { label: "Approved", color: "green" },
  pending: { label: "Pending", color: "orange" },
  rejected: { label: "Rejected", color: "red" },
};
