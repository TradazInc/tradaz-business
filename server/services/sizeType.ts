import { sizeTypeService } from "../entities/sizeType";

export async function getSizeTypes() {
  return sizeTypeService.getAll();
}
