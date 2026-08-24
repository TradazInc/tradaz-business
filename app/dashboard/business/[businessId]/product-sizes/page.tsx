import ProductSizeForm from "@/components/custom/business/ProductSizeForm";
import ProductSizeTable from "@/components/custom/business/ProductSizeTable";
import { DialogBox } from "@/components/custom/shared/DialogBox";
import EmptyPage from "@/components/custom/shared/EmptyPage";
import { PageContainer } from "@/components/custom/shared/PageContainer";
import PageHeader from "@/components/custom/shared/PageHeader";
import { getSizeTypes } from "@/server/services/sizeType";
import { Button, HStack, Spacer, VStack } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const { data: sizeTypes, error } = await getSizeTypes(businessId);

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
