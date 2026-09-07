import { PAGE_SIZE } from "@/data/constants";
import { subaccountService } from "@/entities/subaccount";

export async function getSubaccounts(organizationId?: string) {
  return subaccountService.getAll({
    query: { pageSize: PAGE_SIZE, organizationId },
  });
}
