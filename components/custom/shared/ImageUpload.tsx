"use client";

import { MAX_FILE_SIZE, MAX_FILES } from "@/data/constants";
import {
  Box,
  FileUpload,
  FormatByte,
  Icon,
  Image,
  VStack,
  Wrap,
} from "@chakra-ui/react";
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
      <CldUploadWidget
        signatureEndpoint="/api/media/upload-signature"
        options={{
          maxFiles: MAX_FILES,
          maxFileSize: MAX_FILE_SIZE,
          inlineContainer: "#cld-widget",
        }}
        onSuccess={(result) => {
          if (result.event !== "success") return;
          const info = result.info as CloudinaryResult;
          setUrls((prev) => [...prev, info.url]);
        }}
      >
        {({ open }) => {
          return (
            <FileUpload.Root alignItems={"stretch"} w={"full"}>
              <FileUpload.Dropzone
                onClick={(e) => {
                  e.preventDefault();
                  open();
                }}
              >
                <Icon size={"md"} color={"fg.muted"}>
                  <LuUpload />
                </Icon>
                <FileUpload.DropzoneContent>
                  <Box>Drag and drop files here</Box>
                  <Box color={"fg.muted"}>
                    Images up to <FormatByte value={MAX_FILE_SIZE} />
                  </Box>
                </FileUpload.DropzoneContent>
              </FileUpload.Dropzone>
            </FileUpload.Root>
          );
        }}
      </CldUploadWidget>
      <Wrap>
        {urls.length > 0 &&
          urls.map((url, key) => <Image key={key} src={url} rounded={"md"} />)}
      </Wrap>
    </VStack>
  );
};

export default ImageUpload;
