import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { PageItemContainer } from "@/components/shared/PageItemContainer";
import {
  ProductSizeForm,
  ProductSizeFormViewport,
} from "@/components/shared/ProductSizeForm";
import ProductSizeTable from "@/components/shared/ProductSizeTable";
import { getSizeTypes } from "@/server/sizeType";
import { Spacer } from "@chakra-ui/react";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const sizeTypes = getSizeTypes().then((d) => [d]);

  return (
    <PageContainer>
      <PageHeader>Product Sizes</PageHeader>

      <PageItemContainer>
        <Spacer />
        <ProductSizeForm />
      </PageItemContainer>

      <ProductSizeTable initialSizeTypes={sizeTypes} businessId={businessId} />
      <ProductSizeFormViewport />
    </PageContainer>
  );
}
