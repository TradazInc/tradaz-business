import { DialogBox } from "@/app/ui/DialogBox";
import EmptyPage from "@/app/ui/EmptyPage";
import { PageContainer } from "@/app/ui/PageContainer";
import PageHeader from "@/app/ui/PageHeader";
import ToolBarContainer from "@/app/ui/ToolBarContainer";
import { Box, Button, Table, VStack } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

export default function page() {
  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Product Sizes</PageHeader>

        <ToolBarContainer>
          <DialogBox
            trigger={
              <Button variant={"outline"} size={"xs"}>
                <LuPlus />
                New Product Size
              </Button>
            }
          >
            <CategoryForm />
          </DialogBox>
        </ToolBarContainer>

        {items?.length ? (
          <Table.Root size="sm">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Product</Table.ColumnHeader>
                <Table.ColumnHeader>Category</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {items.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.category}</Table.Cell>
                  <Table.Cell textAlign="end">{item.price}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        ) : (
          <EmptyPage
            title="No sizes found"
            description="Create a product size"
          >
            <DialogBox
              trigger={
                <Button>
                  <LuPlus />
                  New size
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

export const CategoryForm = () => {
  return <Box>Size form</Box>;
};

const items = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
  { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
  { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
  { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
  { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
];
