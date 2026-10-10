import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import {
  ProductCategoryForm,
  ProductCategoryFormViewport,
} from "@/components/shared/ProductCategoryForm";
import ProductCategoryTable from "@/components/shared/ProductCategoryTable";
import { getProductCategories } from "@/server/productCategory";
import { HStack, Spacer } from "@chakra-ui/react";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const categories = getProductCategories(businessId).then((d) => [d]);

  return (
    <PageContainer>
      <PageHeader>Product Categories</PageHeader>

      <HStack w={"full"}>
        <Spacer />
        <ProductCategoryForm />
      </HStack>

      <ProductCategoryTable
        initialCategories={categories}
        businessId={businessId}
      />
      <ProductCategoryFormViewport />
    </PageContainer>
  );
}
