import {
  ProductSizeForm,
  ProductSizeFormViewport,
} from "@/components/business/ProductSizeForm";
import ProductSizeTable from "@/components/business/ProductSizeTable";
import EmptyPage from "@/components/shared/EmptyPage";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { getSizeTypes } from "@/server/sizeType";
import { HStack, Spacer, VStack } from "@chakra-ui/react";

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
          <ProductSizeForm />
        </HStack>

        {sizeTypes.data.length > 0 ? (
          <ProductSizeTable
            initialSizeTypes={sizeTypes}
            businessId={businessId}
          />
        ) : (
          <EmptyPage
            title="No sizes found"
            description="Create a product size"
          />
        )}
      </VStack>
      <ProductSizeFormViewport />
    </PageContainer>
  );
}
