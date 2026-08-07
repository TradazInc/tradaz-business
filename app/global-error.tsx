"use client";

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
        <Heading size="2xl">Something went wrong!</Heading>
        <Button onClick={() => retry()}>Try again</Button>
      </body>
    </html>
  );
}
