import {
  ProductCategoryForm,
  ProductCategoryFormViewport,
} from "@/components/business/ProductCategoryForm";
import ProductCategoryTable from "@/components/business/ProductCategoryTable";
import EmptyPage from "@/components/shared/EmptyPage";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { getProductCategories } from "@/server/productCategory";
import { HStack, Spacer, VStack } from "@chakra-ui/react";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const { data: categories, error } = await getProductCategories(businessId);

  if (error) return error.message;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Product Categories</PageHeader>

        <HStack w={"full"}>
          <Spacer />
          <ProductCategoryForm />
        </HStack>

        {categories.data.length > 0 ? (
          <ProductCategoryTable
            initialCategories={categories}
            businessId={businessId}
          />
        ) : (
          <EmptyPage
            title="No categories found"
            description="Create a product category"
          />
        )}
      </VStack>
      <ProductCategoryFormViewport />
    </PageContainer>
  );
}
