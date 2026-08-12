import { toaster } from "@/components/ui/toaster";
import { productCategorySchema } from "@/schema/productCategory";
import { useAddProductCategory } from "@/server/hooks/productCategory";
import { errorOptions } from "@/utilities/errorToastOptions";
import { Button, Field, Fieldset, Input, Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const ProductCategoryForm = () => {
  const { trigger, isMutating } = useAddProductCategory();
  const { refresh } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ resolver: zodResolver(productCategorySchema), mode: "onBlur" });

  const onSubmit = handleSubmit(async (categoryData) => {
    const promise = toaster.promise(trigger(categoryData), {
      loading: { title: "Setting up category...", description: "Please wait" },
      success: (category) => ({
        title: "Setup successful",
        description: `${category.name} category has been created`,
      }),
      error: errorOptions,
    });
    if (!promise) return;
    try {
      await promise.unwrap();
      refresh();
    } catch {
      /* Toast handled by the `error` option */
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
            <Input
              placeholder="e.g., Tradaz Lekki Lagos"
              {...register("name")}
            />
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
