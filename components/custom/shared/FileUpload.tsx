"use client";

import { Button } from "@chakra-ui/react";
import { CldUploadWidget } from "next-cloudinary";

const FileUpload = () => {
  return (
    <CldUploadWidget
      signatureEndpoint={`${process.env.NEXT_PUBLIC_BASE_URL}/api/media/upload-signature`}
    >
      {({ open }) => {
        return <Button onClick={() => open()}>Upload an Image</Button>;
      }}
    </CldUploadWidget>
  );
};

export default FileUpload;
