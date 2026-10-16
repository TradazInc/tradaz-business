import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { PageItemContainer } from "@/components/shared/PageItemContainer";
import {
  ProductSizeForm,
  ProductSizeFormViewport,
} from "@/components/shared/ProductSizeForm";
import ProductSizeTable from "@/components/shared/ProductSizeTable";
import Search from "@/components/shared/Search";
import { getSizeTypes } from "@/server/sizeType";
import { Spacer } from "@chakra-ui/react";
import { Suspense } from "react";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const sizeTypes = getSizeTypes(businessId).then((d) => [d]);

  return (
    <PageContainer>
      <PageHeader>Product Sizes</PageHeader>

      <PageItemContainer>
        <Suspense>
          <Search
            placeholder={"Search for an size type"}
            searchField={"search"}
          />
        </Suspense>
        <Spacer />
        <ProductSizeForm />
      </PageItemContainer>

      <ProductSizeTable initialSizeTypes={sizeTypes} businessId={businessId} />
      <ProductSizeFormViewport />
    </PageContainer>
  );
}
