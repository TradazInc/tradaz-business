"use client";

import { toaster } from "@/components/ui/toaster";
import { storeSchema } from "@/schema/store";
import { useAddStore } from "@/server/hooks/store";
import { Button, Field, Fieldset, Input, Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const StoreForm = () => {
  const { businessId } = useParams<{ businessId?: string }>();
  const { trigger, isMutating } = useAddStore(businessId);
  const { refresh, push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ resolver: zodResolver(storeSchema), mode: "onBlur" });

  const onSubmit = handleSubmit(async (storeData) => {
    const { data: store, error } = await trigger(storeData);
    if (store) {
      refresh();
      push(`/dashboard/store/${store.id}`);
    } else {
      toaster.create({
        title: error.code,
        description: error.message,
        type: "error",
      });
    }
  });

  return (
    <form onSubmit={onSubmit} style={{ width: "100%" }}>
      <Fieldset.Root
        size="lg"
        w="full"
        maxW={{ base: "full", md: "2xl", xl: "4xl" }}
        mx="auto"
        px={{ base: 4, md: 0 }}
      >
        <Stack>
          <Fieldset.Legend>Store details</Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide your store details below.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root required invalid={!!errors.name}>
            <Field.Label>
              Name <Field.RequiredIndicator />
            </Field.Label>
            <Input {...register("name")} />
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={!!errors.address}>
            <Field.Label>
              Address <Field.RequiredIndicator />
            </Field.Label>
            <Input {...register("address")} />
            <Field.ErrorText>{errors.address?.message}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>

        <Button
          type={"submit"}
          variant={"outline"}
          alignSelf={"flex-start"}
          disabled={!isValid || isSubmitting || isMutating}
          loading={isSubmitting || isMutating}
        >
          Submit
        </Button>
      </Fieldset.Root>
    </form>
  );
};
