"use client";

import { createStore } from "@/services/store";
import { Button, Field, Fieldset, Input, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const StoreForm = () => {
  const [isSubmitting, startSubmission] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startSubmission(async () => {
      const store = await createStore(formData);
      if (store) router.push(`/dashboard/store/${store.id}`);
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
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
          <Field.Root required>
            <Field.Label>
              Name <Field.RequiredIndicator />
            </Field.Label>
            <Input name="name" />
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              Address <Field.RequiredIndicator />
            </Field.Label>
            <Input name="address" />
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
