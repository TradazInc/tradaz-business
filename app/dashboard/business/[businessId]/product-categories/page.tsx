import { ProductCategoryForm, ProductCategoryFormViewport } from "@/components/business/ProductCategoryForm";
import ProductCategoryTable from "@/components/business/ProductCategoryTable";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { getProductCategories } from "@/server/productCategory";
import { HStack, Spacer, VStack } from "@chakra-ui/react";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const categories = getProductCategories(businessId).then((d) => [d]);

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Product Categories</PageHeader>

        <HStack w={"full"}>
          <Spacer />
          <ProductCategoryForm />
        </HStack>

        <ProductCategoryTable
          initialCategories={categories}
          businessId={businessId}
        />
      </VStack>
      <ProductCategoryFormViewport />
    </PageContainer>
  );
}
