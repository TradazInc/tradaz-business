import { PageContainer } from "@/components/shared/PageContainer";

interface Props {
  params: Promise<{ revenueId: string }>;
}

export default async function page({ params }: Props) {
  const { revenueId } = await params;

  return <PageContainer>Revenue {revenueId}</PageContainer>;
}
