import ProductCategoryForm from "@/components/custom/business/ProductCategoryForm";
import ProductCategoryTable from "@/components/custom/business/ProductCategoryTable";
import { DialogBox } from "@/components/custom/shared/DialogBox";
import EmptyPage from "@/components/custom/shared/EmptyPage";
import { PageContainer } from "@/components/custom/shared/PageContainer";
import PageHeader from "@/components/custom/shared/PageHeader";
import { getProductCategories } from "@/server/services/productCategory";
import { Button, HStack, Spacer, VStack } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

export default async function page() {
  const { data, error } = await getProductCategories();

  if (error) return error.message ?? error.statusText;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Product Categories</PageHeader>

        <HStack w={"full"}>
          <Spacer />
          <DialogBox
            trigger={
              <Button variant={"outline"} size={"xs"}>
                <LuPlus />
                New Category
              </Button>
            }
          >
            <ProductCategoryForm />
          </DialogBox>
        </HStack>

        {data ? (
          <ProductCategoryTable initialCategories={data} />
        ) : (
          <EmptyPage
            title="No categories found"
            description="Create a product category"
          >
            <DialogBox
              trigger={
                <Button>
                  <LuPlus />
                  New Category
                </Button>
              }
            >
              <ProductCategoryForm />
            </DialogBox>
          </EmptyPage>
        )}
      </VStack>
    </PageContainer>
  );
}
