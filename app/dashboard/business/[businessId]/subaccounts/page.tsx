import SubaccountForm from "@/components/business/SubaccountForm";
import SubaccountTable from "@/components/business/SubaccountTable";
import { DialogBox } from "@/components/shared/DialogBox";
import EmptyPage from "@/components/shared/EmptyPage";
import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import Search from "@/components/shared/Search";
import { getSubaccounts } from "@/server/subaccount";
import { Button, HStack, Spacer, VStack } from "@chakra-ui/react";
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
              searchField={"search"}
            />
          </Suspense>
          <Spacer />
          <DialogBox
            trigger={
              <Button>
                <LuPlus />
                Add Subaccount
              </Button>
            }
          >
            <SubaccountForm />
          </DialogBox>
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
          >
            <DialogBox
              trigger={
                <Button>
                  <LuPlus />
                  Add Subaccount
                </Button>
              }
            >
              <SubaccountForm />
            </DialogBox>
          </EmptyPage>
        )}
      </VStack>
    </PageContainer>
  );
}
