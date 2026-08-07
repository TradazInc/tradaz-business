"use client";

import { Provider } from "@/components/ui/provider";
import { Button, Heading } from "@chakra-ui/react";
import { useEffect } from "react";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <Provider>
          <Heading size="2xl">Something went wrong!</Heading>
          <Button onClick={() => retry()}>Try again</Button>
        </Provider>
      </body>
    </html>
  );
}
