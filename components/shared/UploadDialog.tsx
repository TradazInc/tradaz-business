"use client";

import { useColorModeValue } from "@/components/ui/color-mode";
import { toaster } from "@/components/ui/toaster";
import { system } from "@/theme";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import {
  Box,
  Button,
  Carousel,
  Center,
  CloseButton,
  Dialog,
  IconButton,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
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

export const UploadDialog = ({
  disabled,
  maxFiles,
  maxFileSize,
  onValueChange,
  slidesPerPage,
  value,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const items = Array.from({ length: maxFiles });
  const remainingFiles = maxFiles - value.length;

  // The widget keeps the callbacks it was created with, so read the latest
  // props through a ref instead of closing over them
  const latest = useRef({ value, onValueChange });
  useEffect(() => {
    latest.current = { value, onValueChange };
  }, [value, onValueChange]);

  const addFileURL = useCallback((url: string) => {
    // Accumulate locally so back-to-back uploads don't overwrite each other
    const images = [...latest.current.value, url];
    latest.current.value = images;
    latest.current.onValueChange(images);
  }, []);

  return (
    <VStack gapY={5} w={"full"}>
      <Carousel.Root
        slideCount={value.length || items.length}
        slidesPerPage={slidesPerPage}
        spacing={"8px"}
        w={"full"}
        // A single full-width slide is too large, so cap the width
        maxW={slidesPerPage === 1 ? "xs" : undefined}
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
                      alt={`File ${index + 1}`}
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

      <Button
        w={"full"}
        variant={"subtle"}
        disabled={disabled || remainingFiles <= 0}
        onClick={() => setOpen(true)}
      >
        <HiUpload /> Upload files
      </Button>

      <Dialog.Root
        open={open}
        // Block closing mid-upload: unmounting destroys the widget and aborts it
        onOpenChange={(e) => !uploading && setOpen(e.open)}
        closeOnEscape={!uploading}
        closeOnInteractOutside={!uploading}
        size={"lg"}
        lazyMount
        unmountOnExit
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Upload files</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <InlineUploadWidget
                  maxFiles={remainingFiles}
                  maxFileSize={maxFileSize}
                  onFileUploaded={addFileURL}
                  setUploading={setUploading}
                  onClose={() => setOpen(false)}
                />
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" disabled={uploading} />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </VStack>
  );
};

interface InlineUploadWidgetProps {
  maxFiles: number;
  maxFileSize: number;
  onFileUploaded: (url: string) => void;
  setUploading: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}

// The widget captures its callbacks when it is created, so they must only
// use stable references (state setters, toaster) to avoid stale closures.
const InlineUploadWidget = ({
  maxFiles,
  maxFileSize,
  onFileUploaded,
  setUploading,
  onClose,
}: InlineUploadWidgetProps) => {
  const palette = useColorModeValue(lightModePalette, darkModePalette);
  const toastId = useId();
  // CSS Selector-safe id, the container must exist before the widget is created
  const containerId = `cld-inline-${useId().replace(/[^\w-]/g, "")}`;

  return (
    <CldUploadWidget
      signatureEndpoint={"/api/media/upload-signature"}
      options={{
        cropping: true,
        maxFileSize,
        maxFiles,
        inlineContainer: `#${containerId}`,
        styles: { palette },
      }}
      onSuccess={(result) => {
        const info = result.info;
        if (!info || typeof info === "string") return;
        onFileUploaded(info.secure_url);
      }}
      onClose={() => onClose()}
      onQueuesStart={() => {
        setUploading(true);
        toaster.loading({
          id: toastId,
          title: "Uploading files...",
          description: "This may take a moment",
        });
      }}
      onQueuesEnd={() => {
        setUploading(false);
        toaster.success({
          id: toastId,
          title: "Upload successful",
          description: "Files have been uploaded",
        });
      }}
      onRetry={() =>
        toaster.loading({
          id: toastId,
          title: "Retrying upload...",
          description: "Please wait",
        })
      }
      onBatchCancelled={(result) => {
        setUploading(false);
        const info = result.info;
        if (typeof info === "string") return;
        toaster.error({
          id: toastId,
          title: "Upload cancelled",
          description: info?.reason ?? "File upload was cancelled",
        });
      }}
      onError={(error) => {
        setUploading(false);
        toaster.create({ id: toastId, ...errorToastOptions(error) });
      }}
      onAbort={() => {
        setUploading(false);
        toaster.warning({
          id: toastId,
          title: "Upload aborted",
          description: "File upload was aborted",
        });
      }}
    >
      {({ open, isLoading }) => (
        <>
          <OpenWhenReady isLoading={isLoading} open={open} />
          <Center
            id={containerId}
            w={"full"}
            h={{ base: "60vh", md: "500px" }}
            rounded={"md"}
            overflow={"hidden"}
          >
            {isLoading && <Box color={"fg.muted"}>Loading uploader...</Box>}
          </Center>
        </>
      )}
    </CldUploadWidget>
  );
};

// Inline widgets render nothing until opened, so open once the script loads
const OpenWhenReady = ({
  isLoading,
  open,
}: {
  isLoading?: boolean;
  open: () => void;
}) => {
  const opened = useRef(false);

  useEffect(() => {
    if (isLoading || opened.current) return;
    opened.current = true;
    open();
  }, [isLoading, open]);

  return null;
};

const lightModePalette = {
  window: system.token("colors.white"),
  sourceBg: system.token("colors.white"),
  windowBorder: system.token("colors.gray.400"),
  tabIcon: system.token("colors.black"),
  inactiveTabIcon: system.token("colors.gray.400"),
  menuIcons: system.token("colors.black"),
  link: system.token("colors.gray.200"),
  action: system.token("colors.orange.600"),
  inProgress: system.token("colors.blue.600"),
  complete: system.token("colors.green.600"),
  error: system.token("colors.red.500"),
  textDark: system.token("colors.black"),
  textLight: system.token("colors.gray.50"),
};

const darkModePalette = {
  window: system.token("colors.gray.950"),
  sourceBg: system.token("colors.gray.950"),
  windowBorder: system.token("colors.gray.500"),
  tabIcon: system.token("colors.gray.50"),
  inactiveTabIcon: system.token("colors.gray.500"),
  menuIcons: system.token("colors.white"),
  link: system.token("colors.gray.800"),
  action: system.token("colors.blue.600"),
  inProgress: system.token("colors.blue.300"),
  complete: system.token("colors.green.300"),
  error: system.token("colors.red.400"),
  textDark: system.token("colors.black"),
  textLight: system.token("colors.gray.50"),
};
