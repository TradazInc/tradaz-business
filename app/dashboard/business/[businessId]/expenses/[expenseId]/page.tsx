import { PageContainer } from "@/components/shared/PageContainer";

interface Props {
  params: Promise<{ expenseId: string }>;
}

export default async function page({ params }: Props) {
  const { expenseId } = await params;

  return <PageContainer py={10}>Revenue {expenseId}</PageContainer>;
}
