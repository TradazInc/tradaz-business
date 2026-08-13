import { MediaClient } from "@/lib/mediaClient";

export interface UploadedMedia {
  secure_url: string;
  public_Id: string;
  url: string;
}

export const storageService = new MediaClient<UploadedMedia>("/v1_1");
