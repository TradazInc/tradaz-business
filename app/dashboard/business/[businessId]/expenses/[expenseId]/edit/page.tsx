import ExpenseForm from "@/components/business/ExpenseForm";
import RevenueForm from "@/components/business/RevenueForm";
import { PageContainer } from "@/components/shared/PageContainer";

interface Props {
  params: Promise<{ expenseId: string }>;
}

export default async function page({ params }: Props) {
  const { expenseId } = await params;

  return (
    <PageContainer>
      <ExpenseForm />
    </PageContainer>
  );
}
