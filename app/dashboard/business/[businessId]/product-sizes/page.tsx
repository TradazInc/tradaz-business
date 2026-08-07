import ProductSizeTable from "@/components/custom/business/ProductSizeTable";
import { DialogBox } from "@/components/custom/shared/DialogBox";
import EmptyPage from "@/components/custom/shared/EmptyPage";
import { PageContainer } from "@/components/custom/shared/PageContainer";
import PageHeader from "@/components/custom/shared/PageHeader";
import ToolBarContainer from "@/components/custom/shared/ToolBarContainer";
import { getSizeTypes } from "@/server/services/sizeType";
import { Box, Button, VStack } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

export default async function page() {
  const { data, error } = await getSizeTypes();

  if (error) return error.message ?? error.statusText;

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
