import { PageContainer } from "@/components/shared/PageContainer";

interface Props {
  params: Promise<{ subdomain: string }>;
}

export default async function page({ params }: Props) {
  const { subdomain } = await params;

  return <PageContainer>{subdomain} home page</PageContainer>;
}
