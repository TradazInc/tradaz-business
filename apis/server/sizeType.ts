import { toaster } from "@/components/ui/toaster";
import { getAuthHeaders } from "@/utilities/serverHeaders";
import { sizeTypeService } from "../services/sizeType";

export async function getSizeTypes() {
  try {
    return await sizeTypeService.getAll({ headers: await getAuthHeaders() });
  } catch (error) {
    toaster.create({
      title: "Failed to fetch product size types",
      description: error instanceof Error ? error.message : "Please try again.",
      type: "error",
    });
  }
}
