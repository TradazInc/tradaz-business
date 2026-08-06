import { getProductCategories } from "@/server/services/productCategory";
import ProductCategoryTable from "@/components/custom/business/ProductCategoryTable";
import { DialogBox } from "@/components/custom/shared/DialogBox";
import EmptyPage from "@/components/custom/shared/EmptyPage";
import { PageContainer } from "@/components/custom/shared/PageContainer";
import PageHeader from "@/components/custom/shared/PageHeader";
import ToolBarContainer from "@/components/custom/shared/ToolBarContainer";
import { toaster } from "@/components/ui/toaster";
import { Box, Button, VStack } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

export default async function page() {
  const { data, error } = await getProductCategories();

  if (error) {
    toaster.create({
      title: error.statusText,
      description: error.message,
      type: "error",
    });
  }

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Product Categories</PageHeader>

        <ToolBarContainer>
          <DialogBox
            trigger={
              <Button variant={"outline"} size={"xs"}>
                <LuPlus />
                New Category
              </Button>
            }
          >
            <CategoryForm />
          </DialogBox>
        </ToolBarContainer>

        {data ? (
          <ProductCategoryTable />
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
              <CategoryForm />
            </DialogBox>
          </EmptyPage>
        )}
      </VStack>
    </PageContainer>
  );
}

const CategoryForm = () => {
  return <Box>Category form</Box>;
};

const items = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
  { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
  { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
  { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
  { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
];
