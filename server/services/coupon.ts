import { PAGE_SIZE } from "@/data/constants";
import { couponService } from "../entities/coupons";

export async function getCoupons(organizationId?: string) {
  return couponService.getAll({
    query: { pageSize: PAGE_SIZE, organizationId },
  });
}
