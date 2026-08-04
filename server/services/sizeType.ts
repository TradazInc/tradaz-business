import { BetterFetchError } from "@better-fetch/fetch";
import { sizeTypeService } from "../entities/sizeType";

export async function getSizeTypes() {
  try {
    const data = await sizeTypeService.getAll();
    return { data };
  } catch (err) {
    const error = err as BetterFetchError;
    return { error };
  }
}
