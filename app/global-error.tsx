"use client";

import { Provider } from "@/components/ui/provider";
import { Button, Center, Heading } from "@chakra-ui/react";
import { useEffect } from "react";

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
          <Center w="full" h="full">
            <Heading size="2xl">Something went wrong!</Heading>
            <Button onClick={() => reset()}>Try again</Button>
          </Center>
        </Provider>
      </body>
    </html>
  );
}
