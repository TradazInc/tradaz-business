import MemberTable from "@/components/shared/MemberTable";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import Search from "@/components/shared/Search";
import { getMembers } from "@/server/member";
import { HStack, Spacer } from "@chakra-ui/react";
import { Suspense } from "react";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const members = getMembers(businessId).then((d) => [d]);

  return (
    <PageContainer>
      <PageHeader>Customers</PageHeader>

      <HStack w={"full"}>
        <Suspense>
          <Search
            placeholder={"Search for a customer"}
            searchField={"search"}
          />
        </Suspense>
        <Spacer />
      </HStack>

      <MemberTable initialMembers={members} businessId={businessId} />
    </PageContainer>
  );
}
