import { ProductSizeForm, ProductSizeFormViewport } from "@/components/business/ProductSizeForm";
import ProductSizeTable from "@/components/business/ProductSizeTable";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { getSizeTypes } from "@/server/sizeType";
import { HStack, Spacer, VStack } from "@chakra-ui/react";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const sizeTypes = getSizeTypes().then((d) => [d]);

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Product Sizes</PageHeader>

        <HStack w={"full"}>
          <Spacer />
          <ProductSizeForm />
        </HStack>

        <ProductSizeTable
          initialSizeTypes={sizeTypes}
          businessId={businessId}
        />
      </VStack>
      <ProductSizeFormViewport />
    </PageContainer>
  );
}
