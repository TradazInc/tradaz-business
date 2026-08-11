import { BusinessForm } from "@/components/custom/dashboard/BusinessForm";
import BusinessGrid from "@/components/custom/dashboard/BusinessGrid";
import { DialogBox } from "@/components/custom/shared/DialogBox";
import EmptyPage from "@/components/custom/shared/EmptyPage";
import { PageContainer } from "@/components/custom/shared/PageContainer";
import PageHeader from "@/components/custom/shared/PageHeader";
import Search from "@/components/custom/shared/Search";
import ToolBarContainer from "@/components/custom/shared/ToolBarContainer";
import { getBusinesses } from "@/server/services/business";
import { Button, VStack } from "@chakra-ui/react";
import { Suspense } from "react";
import { LuPlus } from "react-icons/lu";

interface Props {
  searchParams: Promise<{ business: string; signup: string }>;
}

export default async function page({ searchParams }: Props) {
  const { business, signup } = await searchParams;
  const { data: businesses, error } = await getBusinesses(business);

  if (error) return error.message ?? error.statusText;

  return (
    <PageContainer>
      <VStack w={"full"} h={"full"}>
        <PageHeader>Your Brands</PageHeader>

        <ToolBarContainer>
          <Suspense>
            <Search placeholder={"Search for a brand"} query={"business"} />
          </Suspense>
          <DialogBox
            trigger={
              <Button variant={"outline"} size={"xs"}>
                <LuPlus />
                New Brand
              </Button>
            }
            signup={signup}
          >
            <BusinessForm />
          </DialogBox>
        </ToolBarContainer>

        {businesses.length > 0 ? (
          <BusinessGrid initialBusinesses={businesses} />
        ) : (
          <EmptyPage
            title={"No businesses found"}
            description={"Create a new business"}
          >
            <DialogBox
              trigger={
                <Button>
                  <LuPlus />
                  New Brand
                </Button>
              }
              signup={signup}
            >
              <BusinessForm />
            </DialogBox>
          </EmptyPage>
        )}
      </VStack>
    </PageContainer>
  );
}
