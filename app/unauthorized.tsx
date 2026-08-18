import StatusPage from "@/components/custom/shared/StatusPage";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { PiUserCircleDashedDuotone } from "react-icons/pi";

export default function Unauthorized() {
  return (
    <StatusPage
      icon={<PiUserCircleDashedDuotone />}
      code="401"
      colorPalette="green"
      title="You're not signed in"
      description="Your session has expired or you haven't signed in yet. Sign in to continue where you left off."
    >
      <Button asChild w={{ base: "full", sm: "auto" }}>
        <Link href="/signin">Go to sign in</Link>
      </Button>
      <Button asChild variant="outline" w={{ base: "full", sm: "auto" }}>
        <Link href="/">Go home</Link>
      </Button>
    </StatusPage>
  );
}
