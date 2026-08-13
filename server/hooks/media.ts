import { MEDIA_SIGN_KEY, MEDIA_UPLOAD_KEY } from "@/utilities/cacheKeys";
import useSWRMutation from "swr/mutation";
import { mediaService, UploadSignature } from "../entities/media";
import { storageService } from "../entities/storage";

export const useUploadSignature = () => {
  return useSWRMutation(MEDIA_SIGN_KEY, () =>
    mediaService.post({ throw: true }),
  );
};

export const useAddImage = () => {
  return useSWRMutation(
    MEDIA_UPLOAD_KEY,
    (
      url: string,
      { arg }: { arg: { file: File; signature: UploadSignature } },
    ) => {
      const {
        file,
        signature: { apiKey, cloudName, folder, signature, timestamp, context },
      } = arg;
      const formData = new FormData();

      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", String(timestamp));
      formData.append("signature", signature);
      formData.append("folder", folder);
      if (context) formData.append("context", context);

      return storageService.post(`${cloudName}/auto/upload`, {
        body: formData,
        throw: true,
      });
    },
  );
};
