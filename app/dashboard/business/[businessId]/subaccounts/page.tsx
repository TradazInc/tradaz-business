import SubaccountTable from "@/components/business/SubaccountTable";
import EmptyPage from "@/components/shared/EmptyPage";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import Search from "@/components/shared/Search";
import { getSubaccounts } from "@/server/subaccount";
import { computePath } from "@/utilities/computePath";
import { Button, HStack, Spacer, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { Suspense } from "react";
import { LuPlus } from "react-icons/lu";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const { data: Subaccounts, error } = await getSubaccounts(businessId);

  if (error) return error?.message;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Subaccounts</PageHeader>

        <HStack w={"full"}>
          <Suspense>
            <Search
              placeholder={"Search for a subaccount"}
              filterField={"name"}
            />
          </Suspense>
          <Spacer />
          <Button asChild>
            <NextLink href={`${computePath(businessId)}/subaccounts/new`}>
              <LuPlus />
              Add Subaccount
            </NextLink>
          </Button>
        </HStack>

        {Subaccounts && Subaccounts.data.length > 0 ? (
          <SubaccountTable
            initialSubaccounts={Subaccounts}
            businessId={businessId}
          />
        ) : (
          <EmptyPage
            title="No subaccount found"
            description="Add a subaccount to receive payments"
          />
        )}
      </VStack>
    </PageContainer>
  );
}
