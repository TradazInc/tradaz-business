"use client";

import { toaster } from "@/components/ui/toaster";
import { MAX_FILE_SIZE, MAX_FILES } from "@/data/constants";
import { useAddImage, useUploadSignature } from "@/server/hooks/media";
import { errorOptions } from "@/utilities/errorToastOptions";
import {
  Box,
  Button,
  FileUpload,
  FileUploadRootProps,
  Float,
  Icon,
  useFileUploadContext,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuUpload, LuX } from "react-icons/lu";

const FileUploadList = () => {
  const fileUpload = useFileUploadContext();
  const files = fileUpload.acceptedFiles;
  if (files.length === 0) return null;
  return (
    <FileUpload.ItemGroup>
      {files.map((file) => (
        <FileUpload.Item
          p={"2"}
          w={"auto"}
          boxSize={"20"}
          file={file}
          key={file.name}
        >
          <FileUpload.ItemPreviewImage />
          <Float placement={"top-end"}>
            <FileUpload.ItemDeleteTrigger
              boxSize={"4"}
              layerStyle={"fill.solid"}
            >
              <LuX />
            </FileUpload.ItemDeleteTrigger>
          </Float>
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  );
};

const ImageUpload = (props: FileUploadRootProps) => {
  const { trigger: getSignature } = useUploadSignature();
  const { trigger: addImage, isMutating } = useAddImage();
  const [files, setFiles] = useState<File[]>([]);
  const [urls, setUrls] = useState<string[]>([]);

  const handleUpload = async () => {
    try {
      // Get upload signature
      const signature = await getSignature();
      if (!signature) return;

      // Upload images
      const promise = toaster.promise(
        Promise.all(files.map((file) => addImage({ file, signature }))),
        {
          loading: { title: "Uploading images...", description: "Please wait" },
          success: {
            title: "Upload successful",
            description: "Images have been uploaded",
          },
          error: errorOptions,
        },
      );
      if (!promise) return;

      // Update RHF
      const media = await promise.unwrap();
      setUrls((prev) => [...prev, ...media.map((img) => img.url)]);
    } catch {} // Error displayed by toast
  };

  return (
    <FileUpload.Root
      accept={["image/*"]}
      maxFiles={MAX_FILES}
      maxFileSize={MAX_FILE_SIZE}
      onFileAccept={({ files }) => setFiles((prev) => [...prev, ...files])}
      onFileChange={() => {}}
      onFileReject={({ files }) =>
        setFiles((prev) =>
          prev.filter(
            (f) => !files.some((rejected) => rejected.file.name === f.name),
          ),
        )
      }
      {...props}
    >
      <FileUpload.HiddenInput />
      <FileUpload.Dropzone>
        <Icon size="md" color="fg.muted">
          <LuUpload />
        </Icon>
        <FileUpload.DropzoneContent>
          <Box>Drag and drop files here</Box>
          <Box color="fg.muted">Images up to {MAX_FILES}MB</Box>
        </FileUpload.DropzoneContent>
      </FileUpload.Dropzone>
      <FileUpload.Label />
      <FileUpload.Dropzone>
        <FileUpload.DropzoneContent />
      </FileUpload.Dropzone>
      <FileUpload.Trigger asChild>
        <Button
          size={"xs"}
          variant={"outline"}
          loading={isMutating}
          onClick={handleUpload}
        >
          Upload images
        </Button>
      </FileUpload.Trigger>
      <FileUploadList />
    </FileUpload.Root>
  );
};

export default ImageUpload;
