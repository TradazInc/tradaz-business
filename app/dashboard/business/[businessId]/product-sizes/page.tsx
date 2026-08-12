import ProductSizeForm from "@/components/custom/business/ProductSizeForm";
import ProductSizeTable from "@/components/custom/business/ProductSizeTable";
import { DialogBox } from "@/components/custom/shared/DialogBox";
import EmptyPage from "@/components/custom/shared/EmptyPage";
import { PageContainer } from "@/components/custom/shared/PageContainer";
import PageHeader from "@/components/custom/shared/PageHeader";
import ToolBarContainer from "@/components/custom/shared/ToolBarContainer";
import { getSizeTypes } from "@/server/services/sizeType";
import { Button, VStack } from "@chakra-ui/react";
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
            <ProductSizeForm />
          </DialogBox>
        </ToolBarContainer>

        {data ? (
          <ProductSizeTable initialSizeTypes={data} />
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
              <ProductSizeForm />
            </DialogBox>
          </EmptyPage>
        )}
      </VStack>
    </PageContainer>
  );
}
