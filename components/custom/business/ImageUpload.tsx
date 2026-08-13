"use client";

import { toaster } from "@/components/ui/toaster";
import { MAX_FILE_SIZE, MAX_FILES } from "@/data/constants";
import { ProductData, ProductFormValues } from "@/schema/product";
import { useAddImage, useUploadSignature } from "@/server/hooks/media";
import { errorOptions } from "@/utilities/errorToastOptions";
import {
  Box,
  Button,
  Field,
  FileUpload,
  Float,
  Icon,
  useFileUpload,
  useFileUploadContext,
} from "@chakra-ui/react";
import { useState } from "react";
import { Control, useController } from "react-hook-form";
import { LuUpload, LuX } from "react-icons/lu";

const FileUploadList = ({
  onDelete,
}: {
  onDelete: (index: number) => void;
}) => {
  const fileUpload = useFileUploadContext();
  const files = fileUpload.acceptedFiles;
  if (files.length === 0) return null;
  return (
    <FileUpload.ItemGroup>
      {files.map((file, index) => (
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
              onClick={() => onDelete(index)}
            >
              <LuX />
            </FileUpload.ItemDeleteTrigger>
          </Float>
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  );
};

interface Props {
  control: Control<ProductFormValues, unknown, ProductData>;
}

const ImageUpload = ({ control }: Props) => {
  const { field, fieldState } = useController({ control, name: "images" });
  const { trigger: getSignature } = useUploadSignature();
  const { trigger: addImage, isMutating } = useAddImage();

  const fileUpload = useFileUpload({
    accept: ["image/*"],
    maxFiles: MAX_FILES,
    maxFileSize: MAX_FILE_SIZE,
    invalid: !!fieldState.error,
    onFileReject: ({ files }) =>
      files.forEach(({ file, errors }) =>
        toaster.error({ title: file.name, description: errors.join(", ") }),
      ),
  });

  const commit = (urls: string[]) => {
    field.onChange(urls);
    field.onBlur();
  };

  const handleUpload = async () => {
    const pending = fileUpload.acceptedFiles;
    if (pending.length === 0) return;
    try {
      // Get upload signature
      const signature = await getSignature();
      if (!signature) return;

      // Upload images
      const promise = toaster.promise(
        Promise.all(pending.map((file) => addImage({ file, signature }))),
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
      commit([
        ...field.value,
        ...media.flatMap((m) => (m?.secure_url ? [m.secure_url] : [])),
      ]);
      fileUpload.clearFiles(); // pending files are now represented by urls
    } catch {} // Error displayed by toast
  };

  const removeUrl = (index: number) =>
    commit(field.value.filter((_, i) => i !== index));

  return (
    <Field.Root required invalid={!!fieldState.error}>
      <FileUpload.RootProvider value={fileUpload} alignItems={"stretch"}>
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
        <FileUpload.Trigger />
        <Button
          size={"xs"}
          variant={"outline"}
          loading={isMutating}
          onClick={handleUpload}
        >
          Upload images
        </Button>
        <FileUploadList onDelete={removeUrl} />
      </FileUpload.RootProvider>
      <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export default ImageUpload;
