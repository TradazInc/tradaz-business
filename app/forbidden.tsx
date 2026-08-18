import StatusPage from "@/components/custom/shared/StatusPage";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { PiLockKeyDuotone } from "react-icons/pi";

export default function Forbidden() {
  return (
    <StatusPage
      icon={<PiLockKeyDuotone />}
      code="403"
      colorPalette="orange"
      title="Access denied"
      description="Your account doesn't have permission to view this page. If you think this is a mistake, contact the owner of the business."
    >
      <Button asChild w={{ base: "full", sm: "auto" }}>
        <Link href="/dashboard">Back to dashboard</Link>
      </Button>
      <Button asChild variant="outline" w={{ base: "full", sm: "auto" }}>
        <Link href="/">Go home</Link>
      </Button>
    </StatusPage>
  );
}
