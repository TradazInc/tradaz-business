"use client";

import { toaster } from "@/components/ui/toaster";
import {
  emptyProductCategory,
  productCategorySchema,
} from "@/schema/productCategory";
import { useAddProductCategory } from "@/server/hooks/productCategory";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import {
  Button,
  Field,
  Fieldset,
  Input,
  Stack,
  useDialogContext,
} from "@chakra-ui/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useForm } from "react-hook-form";

const ProductCategoryForm = () => {
  const { trigger, isMutating } = useAddProductCategory();
  const { setOpen } = useDialogContext(); // throws if the component is ever rendered outside a Dialog.Root

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: standardSchemaResolver(productCategorySchema),
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (categoryData) => {
    const promise = toaster.promise(trigger(categoryData), {
      loading: { title: "Creating category...", description: "Please wait" },
      success: (category) => ({
        title: "Creation successful",
        description: `${category.name} category has been created`,
      }),
      error: errorToastOptions,
    });
    if (!promise) return;
    try {
      await promise.unwrap();
      reset(emptyProductCategory);
      setOpen(false);
    } catch (error) {
      return; // toast already surfaced it; keep the input for a retry
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
          <Fieldset.Legend>Product Category details</Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide the product category details below.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root required invalid={!!errors.name}>
            <Field.Label>
              Name <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="e.g., Footwears" {...register("name")} />
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
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

export default ProductCategoryForm;
