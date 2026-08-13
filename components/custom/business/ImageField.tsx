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

  const setImages = (urls: string[]) => {
    field.onChange(urls);
    field.onBlur();
  };

  const removeAt = (index: number) =>
    setImages(field.value.filter((_, i) => i !== index));

  // Complete*
  const fileUpload = useFileUpload({
    maxFiles: MAX_FILES,
    maxFileSize: MAX_FILE_SIZE,
    accept: ["image/png", "image/jpeg", "image/webp"],
    invalid: !!fieldState.error,
    onFileAccept: async ({ files }) => {
      try {
        // Get upload signature
        const signature = await getSignature();
        if (!signature) return;

        // Upload images
        const promise = toaster.promise(
          Promise.all(files.map((file) => addImage({ file, signature }))),
          {
            loading: {
              title: "Uploading images...",
              description: "Please wait",
            },
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
        setImages([
          ...field.value,
          ...media.map((image) => image?.secure_url).filter(Boolean),
        ]);
      } catch (error) {
        files.forEach((file) => fileUpload.deleteFile(file));
      }
    },
    onFileReject: ({ files }) =>
      files.forEach(({ file, errors }) =>
        toaster.error({ title: file.name, description: errors.join(", ") }),
      ),
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
          <Button variant={"outline"} size={"xs"} loading={isMutating}>
            Upload Images
          </Button>
        </FileUpload.Trigger>
        <FileUpload.ItemGroup>
          <FileUpload.Context>
            {({ acceptedFiles }) =>
              acceptedFiles.map((file, index) => (
                <FileUpload.Item key={`${file.name}-${index}`} file={file}>
                  <FileUpload.ItemPreview />
                  <FileUpload.ItemName />
                  <FileUpload.ItemSizeText />
                  <FileUpload.ItemDeleteTrigger
                    onClick={() => removeAt(index)}
                  />
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
