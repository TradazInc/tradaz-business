"use client";

import { Button, HStack, Image, VStack } from "@chakra-ui/react";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

interface CloudinaryResult {
  url: string;
  secure_url: string;
  public_id: string;
}

const FileUpload = () => {
  const [urls, setUrls] = useState<string[]>([]);

  return (
    <VStack gapY={5}>
      <HStack>
        {urls.length > 0 && urls.map((url) => <Image src={url} rounded="md" />)}
      </HStack>
      <CldUploadWidget
        signatureEndpoint={`${process.env.NEXT_PUBLIC_BASE_URL}/api/media/upload-signature`}
        onSuccess={(result, widget) => {
          if (result.event !== "success") return;
          const info = result.info as CloudinaryResult;
          setUrls((prev) => [...prev, info.url]);
        }}
      >
        {({ open }) => {
          return <Button onClick={() => open()}>Upload an Image</Button>;
        }}
      </CldUploadWidget>
    </VStack>
  );
};

export default FileUpload;
