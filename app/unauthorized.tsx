import { Button, Center, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { PiWarningOctagonDuotone } from "react-icons/pi";

export default function Unauthorized() {
  return (
    <Center w={"full"} h={"full"}>
      <Stack>
        <Icon size={"xl"} color={"bg.muted"}>
          <PiWarningOctagonDuotone />
        </Icon>
        <Heading size={"md"}>401 — Not signed in</Heading>
        <Text mb={"3"} textStyle={"sm"} color={"fg.muted"}>
          You need to sign in to access this page.{" "}
        </Text>
        <Button asChild>
          <Link href="/signin">Go to sign in</Link>
        </Button>
      </Stack>
    </Center>
  );
}
