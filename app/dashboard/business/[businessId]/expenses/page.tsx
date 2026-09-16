import ExpenseTable from "@/components/business/ExpenseTable";
import EmptyPage from "@/components/shared/EmptyPage";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import Search from "@/components/shared/Search";
import { getExpenses } from "@/server/expense";
import { HStack, Spacer, VStack } from "@chakra-ui/react";
import { Suspense } from "react";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const { data: expenses, error } = await getExpenses(businessId);

  if (error) return error?.message;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Expenses</PageHeader>

        <HStack w={"full"}>
          <Suspense>
            <Search
              placeholder={"Search for an expense"}
              filterField={"name"}
            />
          </Suspense>
          <Spacer />
        </HStack>

        {expenses && expenses.data.length > 0 ? (
          <ExpenseTable initialExpenses={expenses} businessId={businessId} />
        ) : (
          <EmptyPage title="No expesnes found" description="Create expense" />
        )}
      </VStack>
    </PageContainer>
  );
}
