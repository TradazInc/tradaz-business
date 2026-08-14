"use client";

import { useColorModeValue } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/toaster";
import { MAX_FILE_SIZE, MAX_FILES } from "@/data/constants";
import { darkModePalette, lightModePalette } from "@/data/imageUpload";
import { CloudinaryResult } from "@/server/entities/storage";
import { errorOptions } from "@/utilities/errorToastOptions";
import {
  Box,
  Carousel,
  FileUpload,
  FormatByte,
  Icon,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useEffect, useId, useState } from "react";
import { LuArrowLeft, LuArrowRight, LuUpload } from "react-icons/lu";

interface Props {
  value: string[];
  onChange: (images: string[]) => void;
  onBlur?: () => void;
  invalid?: boolean;
  disabled?: boolean;
}

const ImageUpload = ({ disabled, onChange, value, invalid, onBlur }: Props) => {
  const palette = useColorModeValue(lightModePalette, darkModePalette);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const toastId = useId();

  const isFull = disabled || value.length >= MAX_FILES;

  useEffect(() => {
    // Trigger controller events after render
    if (imageURLs.length === 0) return;
    onChange([...value, ...imageURLs]);
    setImageURLs([]);
    onBlur?.();
  }, [imageURLs, value, onChange, onBlur]);

  return (
    <VStack gapY={5} w={"full"}>
      <CldUploadWidget
        signatureEndpoint={"/api/media/upload-signature"}
        options={{
          cropping: true,
          maxFiles: MAX_FILES - value.length,
          maxFileSize: MAX_FILE_SIZE,
          styles: { palette, frame: { background: "#00000033" } },
        }}
        onSuccess={(result) => {
          if (result.event !== "success") return;
          const info = result.info as CloudinaryResult;
          setImageURLs((prev) => [...prev, info.secure_url]);
        }}
        onQueuesStart={() =>
          toaster.loading({
            id: toastId,
            title: "Uploading images...",
            description: "This may take a moment",
          })
        }
        onQueuesEnd={() => {
          toaster.success({
            id: toastId,
            title: "Upload successful",
            description: "Images have been uploaded",
          });
        }}
        onBatchCancelled={() =>
          toaster.error({
            id: toastId,
            title: "Upload cancelled",
            description: "Image upload was cancelled",
          })
        }
        onError={(error) =>
          toaster.create({ id: toastId, ...errorOptions(error) })
        }
      >
        {({ open }) => (
          <FileUpload.Root
            w={"full"}
            alignItems={"stretch"}
            invalid={invalid}
            disabled={isFull}
          >
            <FileUpload.Dropzone
              _disabled={{
                opacity: 0.6,
                bg: "bg.muted",
                cursor: "not-allowed",
                borderStyle: "solid",
                _hover: { bg: "bg.muted" },
              }}
              onClick={() => open()}
            >
              <Icon size={"md"} color={"fg.muted"}>
                <LuUpload />
              </Icon>
              <FileUpload.DropzoneContent>
                <Box>
                  {isFull
                    ? `Maximum of ${MAX_FILES} images reached`
                    : "Click to upload files"}
                </Box>
                <Box color={"fg.muted"}>
                  Images up to <FormatByte value={MAX_FILE_SIZE} />
                </Box>
              </FileUpload.DropzoneContent>
            </FileUpload.Dropzone>
          </FileUpload.Root>
        )}
      </CldUploadWidget>

      {value.length > 0 && (
        <Carousel.Root
          slideCount={value.length}
          slidesPerPage={MAX_FILES - 1.5}
          spacing={"8px"}
          w={"full"}
          mx={"auto"}
          gap={"4"}
        >
          <Carousel.Control justifyContent="center" gap="4" width="full">
            <Carousel.PrevTrigger asChild>
              <IconButton size="xs" variant="outline">
                <LuArrowLeft />
              </IconButton>
            </Carousel.PrevTrigger>

            <Carousel.ItemGroup w="full">
              {value.map((url, index) => (
                <Carousel.Item key={url} index={index}>
                  <Box rounded="md" asChild>
                    <CldImage
                      src={url}
                      width={200}
                      height={200}
                      crop={"fill"}
                      alt={`Product image ${index + 1}`}
                    />
                  </Box>
                </Carousel.Item>
              ))}
            </Carousel.ItemGroup>

            <Carousel.NextTrigger asChild>
              <IconButton size="xs" variant="outline">
                <LuArrowRight />
              </IconButton>
            </Carousel.NextTrigger>
          </Carousel.Control>

          <Carousel.Indicators />
        </Carousel.Root>
      )}
    </VStack>
  );
};

export default ImageUpload;
