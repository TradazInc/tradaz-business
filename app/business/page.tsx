import { Box } from "@chakra-ui/react";
import { SideBar } from "./SideBar";
import { PageContainer } from "../components/PageContainer";

export default function page() {
  return (
    <PageContainer>
      <SideBar />
      <Box>Business Page</Box>
    </PageContainer>
  );
}
