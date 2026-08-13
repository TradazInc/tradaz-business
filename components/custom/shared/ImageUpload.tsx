"use client";

import { useColorModeValue } from "@/components/ui/color-mode";
import { MAX_FILE_SIZE, MAX_FILES } from "@/data/constants";
import { darkModePalette, lightModePalette } from "@/data/imageUpload";
import { CloudinaryResult } from "@/server/entities/storage";
import {
  Box,
  CloseButton,
  Dialog,
  FileUpload,
  FormatByte,
  Icon,
  Portal,
  SimpleGrid,
  useDialogContext,
  VStack,
} from "@chakra-ui/react";
import {
  CldImage,
  CldUploadWidget,
  CldUploadWidgetPropsChildren,
} from "next-cloudinary";
import { useEffect, useState } from "react";
import { LuUpload } from "react-icons/lu";

interface WidgetMountProps {
  isLoading?: boolean;
  open: CldUploadWidgetPropsChildren["open"];
}

const WidgetMount = ({ isLoading, open }: WidgetMountProps) => {
  const dialog = useDialogContext();

  useEffect(() => {
    if (!dialog.open || isLoading) return;
    open();
  }, [dialog.open, isLoading, open]);

  return <Box id="cld-widget" w={"full"} minH={"25rem"} />;
};

const ImageUpload = () => {
  const [publicIds, setPublicIds] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const palette = useColorModeValue(lightModePalette, darkModePalette);

  return (
    <VStack gapY={5}>
      <Dialog.Root
        lazyMount
        size={"cover"}
        open={open}
        onOpenChange={({ open }) => setOpen(open)}
      >
        <FileUpload.Root alignItems={"stretch"} w={"full"}>
          <Dialog.Trigger asChild>
            <FileUpload.Dropzone>
              <Icon size={"md"} color={"fg.muted"}>
                <LuUpload />
              </Icon>
              <FileUpload.DropzoneContent>
                <Box>Drag and drop files here</Box>
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
                  signatureEndpoint="/api/media/upload-signature"
                  options={{
                    cropping: true,
                    maxFiles: MAX_FILES,
                    maxFileSize: MAX_FILE_SIZE,
                    inlineContainer: "#cld-widget",
                    styles: { palette },
                  }}
                  onSuccess={(result) => {
                    if (result.event !== "success") return;
                    const info = result.info as CloudinaryResult;
                    setPublicIds((prev) => [...prev, info.public_id]);
                  }}
                  onQueuesEnd={() => setOpen(false)}
                >
                  {({ open, isLoading }) => (
                    <WidgetMount isLoading={isLoading} open={open} />
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

      <SimpleGrid columns={MAX_FILES} gap={3} w={"full"}>
        {publicIds.map((publicId) => (
          <Box
            key={publicId}
            rounded={"md"}
            overflow={"hidden"}
            aspectRatio={1}
          >
            <CldImage
              src={publicId}
              width={200}
              height={200}
              crop={"fill"}
              alt=""
            />
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default ImageUpload;
