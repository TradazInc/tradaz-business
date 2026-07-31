import { PageContainer } from "@/components/custom/PageContainer";

interface Props {
  params: Promise<{ storeId: string }>;
}

const page = async ({ params }: Props) => {
  const { storeId } = await params;

  return <PageContainer>Store {storeId}</PageContainer>;
};

export default page;
