import { VStack } from "@chakra-ui/react";
import { PageContainer } from "../components/PageContainer";
import Header from "./Header";
import ToolBar from "./ToolBar";

export default function page() {
  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <Header />
        <ToolBar />
        Business Page
      </VStack>
    </PageContainer>
  );
}
