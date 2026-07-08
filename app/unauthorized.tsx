import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <Stack minH="100dvh" align="center" justify="center" gap="4" p="6">
      <Heading size="2xl">401 — Not signed in</Heading>
      <Text color="fg.muted">You need to sign in to access this page.</Text>
      <Button asChild>
        <Link href="/signin">Go to sign in</Link>
      </Button>
    </Stack>
  );
}
