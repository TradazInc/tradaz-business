import { getProductCategories } from "@/api/server/productCategories";
import ProductCategoryTable from "@/components/custom/business/ProductCategoryTable";
import { DialogBox } from "@/components/custom/DialogBox";
import EmptyPage from "@/components/custom/EmptyPage";
import { PageContainer } from "@/components/custom/PageContainer";
import PageHeader from "@/components/custom/PageHeader";
import ToolBarContainer from "@/components/custom/ToolBarContainer";
import { Box, Button, VStack } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

export default async function page() {
  const categories = await getProductCategories();

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

        {categories ? (
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
