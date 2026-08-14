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
  CloseButton,
  Dialog,
  FileUpload,
  FormatByte,
  Icon,
  IconButton,
  Portal,
  useDialogContext,
  VStack,
} from "@chakra-ui/react";
import {
  CldImage,
  CldUploadWidget,
  CldUploadWidgetPropsChildren,
} from "next-cloudinary";
import { useEffect, useId, useState } from "react";
import { LuChevronLeft, LuChevronRight, LuUpload } from "react-icons/lu";

interface WidgetMountProps {
  id: string;
  isLoading?: boolean;
  open: CldUploadWidgetPropsChildren["open"];
}

const WidgetMount = ({ id, isLoading, open }: WidgetMountProps) => {
  const dialog = useDialogContext();

  useEffect(() => {
    if (!dialog.open || isLoading) return;
    open();
  }, [dialog.open, isLoading, open]);

  return <Box id={id} w={"full"} minH={"25rem"} />;
};

interface Props {
  value: string[];
  onChange: (images: string[]) => void;
  onBlur?: () => void;
  invalid?: boolean;
  disabled?: boolean;
}

const ImageUpload = ({ disabled, onChange, value, invalid, onBlur }: Props) => {
  const [open, setOpen] = useState(false);
  const palette = useColorModeValue(lightModePalette, darkModePalette);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const containerId = useId();
  const toastId = `upload:${containerId}`;

  const isFull = disabled || value.length >= MAX_FILES;

  useEffect(() => {
    if (imageURLs.length === 0) return;
    onChange([...value, ...imageURLs]);
    setImageURLs([]);
    onBlur?.();
  }, [imageURLs, value, onChange, onBlur]);

  return (
    <VStack gapY={5} w={"full"}>
      <Dialog.Root
        lazyMount
        size={"cover"}
        open={open}
        onOpenChange={({ open }) => setOpen(open && !isFull)}
      >
        <FileUpload.Root
          w={"full"}
          alignItems={"stretch"}
          invalid={invalid}
          disabled={isFull}
        >
          <Dialog.Trigger asChild>
            <FileUpload.Dropzone
              _disabled={{
                opacity: 0.6,
                bg: "bg.muted",
                cursor: "not-allowed",
                borderStyle: "solid",
                _hover: { bg: "bg.muted" },
              }}
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
          </Dialog.Trigger>
        </FileUpload.Root>

        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Upload images</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <CldUploadWidget
                  signatureEndpoint={"/api/media/upload-signature"}
                  options={{
                    cropping: true,
                    maxFiles: MAX_FILES - value.length,
                    maxFileSize: MAX_FILE_SIZE,
                    inlineContainer: `#${containerId}`,
                    styles: { palette },
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
                    setOpen(false);
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
                  {({ open, isLoading }) => (
                    <WidgetMount
                      isLoading={isLoading}
                      open={open}
                      id={containerId}
                    />
                  )}
                </CldUploadWidget>
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton size={"sm"} />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      <Carousel.Root
        spacing={"8px"}
        slidesPerPage={1.5}
        slideCount={value.length}
        w={"full"}
        mx={"auto"}
      >
        <Carousel.ItemGroup>
          {value.map((url, index) => (
            <Carousel.Item key={url} index={index}>
              <CldImage
                src={url}
                width={200}
                height={200}
                crop={"fill"}
                alt={`Product image ${index + 1}`}
              />
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
    </VStack>
  );
};

export default ImageUpload;
