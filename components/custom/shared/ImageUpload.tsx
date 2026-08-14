"use client";

import { useColorModeValue } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/toaster";
import { MAX_FILE_SIZE, MAX_FILES } from "@/data/constants";
import { darkModePalette, lightModePalette } from "@/data/imageUpload";
import { CloudinaryResult } from "@/server/entities/storage";
import { errorOptions } from "@/utilities/errorToastOptions";
import {
  Box,
  Button,
  Carousel,
  Center,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useEffect, useId, useState } from "react";
import { HiUpload } from "react-icons/hi";
import {
  LuArrowLeft,
  LuArrowRight,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";

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
  const items = Array.from({ length: MAX_FILES });
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
      <Carousel.Root
        slideCount={value.length || items.length}
        slidesPerPage={MAX_FILES - 1.5}
        spacing={"8px"}
        w={"full"}
        mx={"auto"}
        gap={"4"}
      >
        <Carousel.ItemGroup w="full">
          {value.length > 0
            ? value.map((url, index) => (
                <Carousel.Item key={url} index={index}>
                  <Box rounded="md" asChild>
                    <CldImage
                      src={url}
                      aspectRatio={1}
                      crop={"fill"}
                      alt={`Product image ${index + 1}`}
                    />
                  </Box>
                </Carousel.Item>
              ))
            : items.map((_, index) => (
                <Carousel.Item key={index} index={index}>
                  <Center
                    w="full"
                    aspectRatio="1"
                    rounded="md"
                    fontSize="2.5rem"
                    bg="bg.emphasized"
                  >
                    {index + 1}
                  </Center>
                </Carousel.Item>
              ))}
        </Carousel.ItemGroup>

        <Carousel.Control justifyContent="center" gap="4">
          <Carousel.PrevTrigger asChild>
            <IconButton size="xs" variant="ghost">
              <LuChevronLeft />
            </IconButton>
          </Carousel.PrevTrigger>

          <Carousel.Indicators />

          <Carousel.NextTrigger asChild>
            <IconButton size="xs" variant="ghost">
              <LuChevronRight />
            </IconButton>
          </Carousel.NextTrigger>
        </Carousel.Control>
      </Carousel.Root>

      <CldUploadWidget
        signatureEndpoint={"/api/media/upload-signature"}
        options={{
          cropping: true,
          maxFiles: MAX_FILES - value.length,
          maxFileSize: MAX_FILE_SIZE,
          styles: { palette, frame: { background: "rgba(0, 0, 0, 0)" } },
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
          <Button
            w={"full"}
            variant={"subtle"}
            disabled={isFull}
            onClick={() => open()}
          >
            <HiUpload /> Upload images
          </Button>
        )}
      </CldUploadWidget>
    </VStack>
  );
};

export default ImageUpload;
