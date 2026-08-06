import { getSizeTypes } from "@/server/services/sizeType";
import ProductSizeTable from "@/components/custom/business/ProductSizeTable";
import { DialogBox } from "@/components/custom/DialogBox";
import EmptyPage from "@/components/custom/EmptyPage";
import { PageContainer } from "@/components/custom/PageContainer";
import PageHeader from "@/components/custom/PageHeader";
import ToolBarContainer from "@/components/custom/ToolBarContainer";
import { toaster } from "@/components/ui/toaster";
import { Box, Button, VStack } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

export default async function page() {
  const { data, error } = await getSizeTypes();

  if (error) {
    toaster.create({
      title: error.statusText,
      description: error.message,
      type: "error",
    });
  }

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Product Sizes</PageHeader>

        <ToolBarContainer>
          <DialogBox
            trigger={
              <Button variant={"outline"} size={"xs"}>
                <LuPlus />
                New Product Size
              </Button>
            }
          >
            <SizeForm />
          </DialogBox>
        </ToolBarContainer>

        {data ? (
          <ProductSizeTable />
        ) : (
          <EmptyPage title="No sizes found" description="Create a product size">
            <DialogBox
              trigger={
                <Button>
                  <LuPlus />
                  New size
                </Button>
              }
            >
              <SizeForm />
            </DialogBox>
          </EmptyPage>
        )}
      </VStack>
    </PageContainer>
  );
}

const SizeForm = () => {
  return <Box>Size form</Box>;
};
