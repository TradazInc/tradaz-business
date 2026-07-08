import { Box } from "@chakra-ui/react";

interface Props {
  params: Promise<{ storeId: string }>;
}

const page = async ({ params }: Props) => {
  const { storeId } = await params;

  return <Box>Store {storeId}</Box>;
};

export default page;
