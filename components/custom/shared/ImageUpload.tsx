"use client";

import { useColorModeValue } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/toaster";
import { darkModePalette, lightModePalette } from "@/data/imageUpload";
import { errorToastOptions } from "@/utilities/errorToastOptions";
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
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface Props {
  value: string[];
  onValueChange: (images: string[]) => void;
  disabled?: boolean;
  maxFiles: number;
  maxFileSize: number;
  slidesPerPage: number;
}

const ImageUpload = ({
  disabled,
  maxFiles,
  maxFileSize,
  onValueChange,
  slidesPerPage,
  value,
}: Props) => {
  const palette = useColorModeValue(lightModePalette, darkModePalette);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const toastId = useId();
  const items = Array.from({ length: maxFiles });

  useEffect(() => {
    // Trigger controller events after render
    if (imageURLs.length === 0) return;
    onValueChange([...value, ...imageURLs]);
    setImageURLs([]);
  }, [imageURLs, value, onValueChange]);

  return (
    <VStack gapY={5} w={"full"}>
      <Carousel.Root
        slideCount={value.length || items.length}
        slidesPerPage={slidesPerPage}
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
                      aspectRatio={4 / 3}
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
                    aspectRatio="4/3"
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
          maxFileSize,
          maxFiles: maxFiles,
          styles: { palette },
        }}
        onSuccess={(result) => {
          const info = result.info;
          if (!info || typeof info === "string") return;
          setImageURLs((prev) => [...prev, info.secure_url]);
        }}
        onQueuesStart={() =>
          toaster.loading({
            id: toastId,
            title: "Uploading images...",
            description: "This may take a moment",
          })
        }
        onQueuesEnd={() =>
          toaster.success({
            id: toastId,
            title: "Upload successful",
            description: "Images have been uploaded",
          })
        }
        onRetry={() =>
          toaster.loading({
            id: toastId,
            title: "Retrying upload...",
            description: "Please wait",
          })
        }
        onBatchCancelled={(result) => {
          const info = result.info;
          if (typeof info === "string") return;
          toaster.error({
            id: toastId,
            title: "Upload cancelled",
            description: info?.reason ?? "Image upload was cancelled",
          });
        }}
        onError={(error) =>
          toaster.create({ id: toastId, ...errorToastOptions(error) })
        }
        onAbort={() =>
          toaster.warning({
            id: toastId,
            title: "Upload aborted",
            description: "Image upload was aborted",
          })
        }
      >
        {({ open }) => (
          <Button
            w={"full"}
            variant={"subtle"}
            disabled={disabled || value.length >= maxFiles}
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
