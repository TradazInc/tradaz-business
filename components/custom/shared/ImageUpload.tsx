"use client";

import { useColorModeValue } from "@/components/ui/color-mode";
import { MAX_FILE_SIZE, MAX_FILES } from "@/data/constants";
import { darkModePalette, lightModePalette } from "@/data/imageUpload";
import {
  Box,
  CloseButton,
  Dialog,
  FileUpload,
  FormatByte,
  Icon,
  Image,
  Portal,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { CldUploadWidget, CldUploadWidgetPropsChildren } from "next-cloudinary";
import { useEffect, useRef, useState } from "react";
import { LuUpload } from "react-icons/lu";

interface CloudinaryResult {
  url: string;
  secure_url: string;
  public_id: string;
}

interface WidgetMountProps {
  isDialogOpen: boolean;
  isLoading?: boolean;
  open: CldUploadWidgetPropsChildren["open"];
}

const WidgetMount = ({ isDialogOpen, isLoading, open }: WidgetMountProps) => {
  const hasOpened = useRef(false);

  useEffect(() => {
    if (!isDialogOpen) {
      hasOpened.current = false;
      return;
    }
    if (isLoading || hasOpened.current) return;

    hasOpened.current = true;
    open();
  }, [isDialogOpen, isLoading, open]);

  return <Box id="cld-widget" w={"full"} minH={"25rem"} />;
};

const ImageUpload = () => {
  const [urls, setUrls] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const palette = useColorModeValue(lightModePalette, darkModePalette);

  return (
    <VStack gapY={5}>
      <Dialog.Root
        size={"cover"}
        lazyMount
        open={isDialogOpen}
        onOpenChange={({ open }) => setIsDialogOpen(open)}
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
                    maxFiles: MAX_FILES,
                    maxFileSize: MAX_FILE_SIZE,
                    inlineContainer: "#cld-widget",
                    styles: { palette },
                  }}
                  onSuccess={(result) => {
                    if (result.event !== "success") return;
                    const info = result.info as CloudinaryResult;
                    setUrls((prev) => [...prev, info.url]);
                  }}
                  onQueuesEnd={() => setIsDialogOpen(false)}
                >
                  {({ open, isLoading }) => (
                    <WidgetMount
                      isDialogOpen={isDialogOpen}
                      isLoading={isLoading}
                      open={open}
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

      <Wrap>
        {urls.length > 0 &&
          urls.map((url, key) => <Image key={key} src={url} rounded={"md"} />)}
      </Wrap>
    </VStack>
  );
};

export default ImageUpload;
