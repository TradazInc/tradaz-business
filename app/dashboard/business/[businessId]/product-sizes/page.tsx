import ProductSizeForm from "@/components/business/ProductSizeForm";
import ProductSizeTable from "@/components/business/ProductSizeTable";
import { DialogBox } from "@/components/shared/DialogBox";
import EmptyPage from "@/components/shared/EmptyPage";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { getSizeTypes } from "@/server/sizeType";
import { Button, HStack, Spacer, VStack } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const { data: sizeTypes, error } = await getSizeTypes();

  if (error) return error.message;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Product Sizes</PageHeader>

        <HStack w={"full"}>
          <Spacer />
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
        </HStack>

        {sizeTypes.data.length > 0 ? (
          <ProductSizeTable
            initialSizeTypes={sizeTypes}
            businessId={businessId}
          />
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
