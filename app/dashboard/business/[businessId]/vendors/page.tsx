import MemberTable from "@/components/business/MemberTable";
import EmptyPage from "@/components/shared/EmptyPage";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import Search from "@/components/shared/Search";
import { getMembers } from "@/server/member";
import { HStack, Spacer, VStack } from "@chakra-ui/react";
import { Suspense } from "react";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const { data: members, error } = await getMembers(businessId);

  if (error) return error?.message;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Vendors</PageHeader>

        <HStack w={"full"}>
          <Suspense>
            <Search placeholder={"Search for a vendor"} filterField={"name"} />
          </Suspense>
          <Spacer />
        </HStack>

        {members && members.data.length > 0 ? (
          <MemberTable initialMembers={members} businessId={businessId} />
        ) : (
          <EmptyPage title="No vendor found" description="Invite new vendor" />
        )}
      </VStack>
    </PageContainer>
  );
}
