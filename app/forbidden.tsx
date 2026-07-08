import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Forbidden() {
  return (
    <Stack minH="100dvh" align="center" justify="center" gap="4" p="6">
      <Heading size="2xl">403 — Access denied</Heading>
      <Text color="fg.muted">
        Your account doesn&apos;t have permission to view this page.
      </Text>
      <Button asChild>
        <Link href="/">Back home</Link>
      </Button>
    </Stack>
  );
}
