import { PageContainer } from "@/components/shared/PageContainer";
import PageHeader from "@/components/shared/PageHeader";
import { PageItemContainer } from "@/components/shared/PageItemContainer";
import Search from "@/components/shared/Search";
import {
  SubaccountForm,
  SubaccountFormViewport,
} from "@/components/shared/SubaccountForm";
import SubaccountTable from "@/components/shared/SubaccountTable";
import { getSubaccounts } from "@/server/subaccount";
import { Spacer } from "@chakra-ui/react";
import { Suspense } from "react";

interface Props {
  params: Promise<{ businessId?: string }>;
}

export default async function page({ params }: Props) {
  const { businessId } = await params;
  const Subaccounts = getSubaccounts(businessId).then((d) => [d]);

  return (
    <PageContainer>
      <PageHeader>Subaccounts</PageHeader>

      <PageItemContainer>
        <Suspense>
          <Search
            placeholder={"Search for a subaccount"}
            searchField={"search"}
          />
        </Suspense>
        <Spacer />
        <SubaccountForm />
      </PageItemContainer>

      <SubaccountTable
        initialSubaccounts={Subaccounts}
        businessId={businessId}
      />
      <SubaccountFormViewport />
    </PageContainer>
  );
}
