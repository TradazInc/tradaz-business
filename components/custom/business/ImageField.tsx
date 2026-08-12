"use client";

import { MAX_FILE_SIZE, MAX_FILES } from "@/data/constants";
import { ProductData, ProductFormValues } from "@/schema/product";
import { useAddImage, useUploadSignature } from "@/server/hooks/media";
import {
  Box,
  Button,
  Field,
  FileUpload,
  Icon,
  useFileUpload,
} from "@chakra-ui/react";
import { Control, useController } from "react-hook-form";
import { LuUpload } from "react-icons/lu";

interface Props {
  control: Control<ProductFormValues, unknown, ProductData>;
}

const ImageField = ({ control }: Props) => {
  const { field, fieldState } = useController({ control, name: "images" });
  const { trigger: getSignature } = useUploadSignature();
  const { trigger: addImage, isMutating } = useAddImage();

  // Complete*
  const fileUpload = useFileUpload({
    maxFiles: MAX_FILES,
    maxFileSize: MAX_FILE_SIZE,
    accept: ["image/png", "image/jpeg", "image/webp"],
    invalid: !!fieldState.error,
    onFileAccept: ({ files }) => {},
    onFileChange: ({ acceptedFiles, rejectedFiles }) => {},
    onFileReject: ({ files }) => {},
  });

  return (
    <Field.Root required invalid={!!fieldState.error}>
      <FileUpload.RootProvider value={fileUpload} alignItems="stretch">
        <FileUpload.HiddenInput />
        <FileUpload.Label>
          Images <Field.RequiredIndicator />
        </FileUpload.Label>
        <FileUpload.Dropzone>
          <Icon size="md" color="fg.muted">
            <LuUpload />
          </Icon>
          <FileUpload.DropzoneContent>
            <Box>Drag and drop files here</Box>
            <Box color="fg.muted">.png, .jpg, .webp up to 5MB</Box>
          </FileUpload.DropzoneContent>
        </FileUpload.Dropzone>
        <FileUpload.Trigger asChild>
          <Button variant={"outline"} size={"xs"}>
            Upload Images
          </Button>
        </FileUpload.Trigger>
        <FileUpload.ItemGroup>
          <FileUpload.Context>
            {({ acceptedFiles }) =>
              acceptedFiles.map((file) => (
                <FileUpload.Item key={file.name} file={file}>
                  <FileUpload.ItemPreview />
                  <FileUpload.ItemName />
                  <FileUpload.ItemSizeText />
                  <FileUpload.ItemDeleteTrigger />
                </FileUpload.Item>
              ))
            }
          </FileUpload.Context>
        </FileUpload.ItemGroup>
      </FileUpload.RootProvider>
      <Field.HelperText>
        Up to {MAX_FILES} images. The first image is used as the cover.
      </Field.HelperText>
      <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
    </Field.Root>
  );
};

export default ImageField;
