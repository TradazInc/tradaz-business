import { Button, Center, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { PiWarningOctagonDuotone } from "react-icons/pi";

export default function Forbidden() {
  return (
    <Center w={"full"} h={"full"}>
      <Stack>
        <Icon size={"xl"} color={"bg.muted"}>
          <PiWarningOctagonDuotone />
        </Icon>
        <Heading size={"md"}>403 — Access denied</Heading>
        <Text mb={"3"} textStyle={"sm"} color={"fg.muted"}>
          Your account doesn&apos;t have permission to view this page.
        </Text>
        <Button asChild>
          <Link href="/">Back home</Link>
        </Button>
      </Stack>
    </Center>
  );
}
