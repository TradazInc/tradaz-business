"use client";

import { storeSchema } from "@/schema/store";
import { createStore } from "@/services/store";
import { Button, Field, Fieldset, Input, Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const StoreForm = () => {
  const { refresh, push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(storeSchema) });

  const onSubmit = handleSubmit(async (storeData) => {
    const store = await createStore(storeData);
    if (store) {
      refresh();
      push(`/dashboard/store/${store.id}`);
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
          alignSelf={"flex-start"}
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          Submit
        </Button>
      </Fieldset.Root>
    </form>
  );
};
