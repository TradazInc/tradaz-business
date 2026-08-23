import { PAGE_SIZE } from "@/data/constants";
import { sizeTypeService } from "../entities/sizeType";

export async function getSizeTypes() {
  return sizeTypeService.getAll({ query: { pageSize: PAGE_SIZE } });
}
