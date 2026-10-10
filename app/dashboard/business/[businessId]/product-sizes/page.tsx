import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import {
  ProductSizeForm,
  ProductSizeFormViewport,
} from "@/components/shared/ProductSizeForm";
import ProductSizeTable from "@/components/shared/ProductSizeTable";
import { getSizeTypes } from "@/server/sizeType";
import { HStack, Spacer } from "@chakra-ui/react";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const sizeTypes = getSizeTypes().then((d) => [d]);

  return (
    <PageContainer>
      <PageHeader>Product Sizes</PageHeader>

      <HStack w={"full"}>
        <Spacer />
        <ProductSizeForm />
      </HStack>

      <ProductSizeTable initialSizeTypes={sizeTypes} businessId={businessId} />
      <ProductSizeFormViewport />
    </PageContainer>
  );
}
