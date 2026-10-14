import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { PageItemContainer } from "@/components/shared/PageItemContainer";
import {
  ProductCategoryForm,
  ProductCategoryFormViewport,
} from "@/components/shared/ProductCategoryForm";
import ProductCategoryTable from "@/components/shared/ProductCategoryTable";
import Search from "@/components/shared/Search";
import { getProductCategories } from "@/server/productCategory";
import { Spacer } from "@chakra-ui/react";
import { Suspense } from "react";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const categories = getProductCategories(businessId).then((d) => [d]);

  return (
    <PageContainer>
      <PageHeader>Product Categories</PageHeader>

      <PageItemContainer>
        <Suspense>
          <Search
            placeholder={"Search for a category"}
            searchField={"search"}
          />
        </Suspense>
        <Spacer />
        <ProductCategoryForm />
      </PageItemContainer>

      <ProductCategoryTable
        initialCategories={categories}
        businessId={businessId}
      />
      <ProductCategoryFormViewport />
    </PageContainer>
  );
}
