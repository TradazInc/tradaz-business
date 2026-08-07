"use client";

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

  // No Chakra here: global-error replaces the root layout, so ChakraProvider
  // is not in the tree. Any Chakra component throws while rendering the error.
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
          Something went wrong!
        </h1>
        <p style={{ margin: "1rem 0", whiteSpace: "pre-wrap" }}>
          {error.message}
        </p>
        {error.digest && (
          <p style={{ margin: "1rem 0", opacity: 0.7 }}>
            Digest: {error.digest}
          </p>
        )}
        <button type="button" onClick={() => retry()}>
          Try again
        </button>
      </body>
    </html>
  );
}
