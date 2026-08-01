import { serverHeaders } from "@/utilities/serverHeaders";
import { sizeTypeService } from "../services/sizeType";

export async function getSizeTypes() {
  try {
    return await sizeTypeService.getAll({ headers: await serverHeaders() });
  } catch (error) {
    throw new Error("Could not fetch size types");
  }
}
