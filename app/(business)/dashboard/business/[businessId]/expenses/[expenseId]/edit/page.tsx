import ExpenseForm from "@/components/shared/ExpenseForm";
import RevenueForm from "@/components/shared/RevenueForm";
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
