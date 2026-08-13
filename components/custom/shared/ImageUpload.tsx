"use client";

import { MAX_FILES } from "@/data/constants";
import { Box, FileUpload, HStack, Icon, Image, VStack } from "@chakra-ui/react";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { LuUpload } from "react-icons/lu";

interface CloudinaryResult {
  url: string;
  secure_url: string;
  public_id: string;
}

const ImageUpload = () => {
  const [urls, setUrls] = useState<string[]>([]);

  return (
    <VStack gapY={5}>
      <HStack>
        {urls.length > 0 && urls.map((url) => <Image src={url} rounded="md" />)}
      </HStack>
      <CldUploadWidget
        signatureEndpoint={`${process.env.NEXT_PUBLIC_BASE_URL}/api/media/upload-signature`}
        onSuccess={(result, options) => {
          if (result.event !== "success") return;
          const info = result.info as CloudinaryResult;
          setUrls((prev) => [...prev, info.url]);
        }}
      >
        {({ open }) => {
          return (
            <FileUpload.Dropzone onClick={() => open()}>
              <Icon size="md" color="fg.muted">
                <LuUpload />
              </Icon>
              <FileUpload.DropzoneContent>
                <Box>Drag and drop files here</Box>
                <Box color="fg.muted">Images up to {MAX_FILES}MB</Box>
              </FileUpload.DropzoneContent>
            </FileUpload.Dropzone>
          );
        }}
      </CldUploadWidget>
    </VStack>
  );
};

export default ImageUpload;
