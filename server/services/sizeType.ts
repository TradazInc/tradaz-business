import { sizeTypeService } from "../entities/sizeType";

export async function getSizeTypes() {
  try {
    const data = await sizeTypeService.getAll();
    return { data };
  } catch (error) {
    return { error };
  }
}
