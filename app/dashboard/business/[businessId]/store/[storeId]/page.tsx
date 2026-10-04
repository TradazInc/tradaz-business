import { PageContainer } from "@/components/shared/PageContainer";

interface Props {
  params: Promise<{ businessId?: string; storeId?: string }>;
}

const page = async ({ params }: Props) => {
  const { storeId } = await params;

  return <PageContainer>Store {storeId}</PageContainer>;
};

export default page;
