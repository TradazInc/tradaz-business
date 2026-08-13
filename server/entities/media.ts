import { ApiClient } from "@/lib/apiClient";

export interface UploadSignature {
  signature: string;
  timestamp: number;
  cloudName: string;
  apiKey: string;
  folder: string;
  context?: string;
}

export const mediaService = new ApiClient<UploadSignature>("/api/media/upload");
