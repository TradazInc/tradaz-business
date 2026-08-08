"use client";

import { Provider } from "@/components/ui/provider";
import { Button, Center, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { PiWarningOctagonDuotone } from "react-icons/pi";
import { TfiReload } from "react-icons/tfi";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <Provider>
          <Center w={"full"} h={"full"}>
            <Stack>
              <Icon size={"xl"} color={"bg.muted"}>
                <PiWarningOctagonDuotone />
              </Icon>
              <Heading size={"md"}>Something went wrong!</Heading>
              <Text mb={"3"} textStyle={"sm"} color={"fg.muted"}>
                There was an issue displaying the content.
              </Text>
              <Button onClick={() => reset()}>
                Try again
                <TfiReload />
              </Button>
            </Stack>
          </Center>
        </Provider>
      </body>
    </html>
  );
}
