"use client";

import StatusPage from "@/components/shared/StatusPage";
import { Provider } from "@/components/ui/provider";
import { Button, Code, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { PiWarningOctagonDuotone } from "react-icons/pi";
import { TfiReload } from "react-icons/tfi";
import { montserratAlternates, poiretOne } from "./fonts";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserratAlternates.variable} ${poiretOne.variable}`}>
        <Provider>
          <StatusPage
            icon={<PiWarningOctagonDuotone />}
            colorPalette="red"
            title="Something went wrong"
            description="An unexpected error stopped this page from loading. Try again — if it keeps happening, reload the app or come back shortly."
            footnote={
              error.digest && (
                <Text textStyle="xs" color="fg.subtle">
                  Reference code <Code size="sm">{error.digest}</Code>
                </Text>
              )
            }
          >
            <Button onClick={() => reset()} w={{ base: "full", sm: "auto" }}>
              Try again
              <TfiReload />
            </Button>
            <Button
              variant="outline"
              w={{ base: "full", sm: "auto" }}
              onClick={() => window.location.assign("/")}
            >
              Go home
            </Button>
          </StatusPage>
        </Provider>
      </body>
    </html>
  );
}
