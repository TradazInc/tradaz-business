"use client";

import { toaster } from "@/components/ui/toaster";
import { emptySize, emptySizeType, sizeTypeSchema } from "@/schema/sizeType";
import { useAddSizeTypes } from "@/hooks/sizeType";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import {
  Button,
  Field,
  Fieldset,
  IconButton,
  Input,
  Stack,
  useDialogContext,
} from "@chakra-ui/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useParams } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { LuPlus, LuTrash2 } from "react-icons/lu";

const ProductSizeForm = () => {
  const { businessId } = useParams<{ businessId?: string }>();
  const { trigger, isMutating } = useAddSizeTypes(businessId);
  // throws if the component is ever rendered outside a Dialog.Root
  const { setOpen } = useDialogContext();

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: standardSchemaResolver(sizeTypeSchema),
    defaultValues: emptySizeType,
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes",
  });

  const onSubmit = handleSubmit(async (sizeTypeData) => {
    const promise = toaster.promise(trigger(sizeTypeData), {
      loading: { title: "Creating size type...", description: "Please wait" },
      success: (sizeType) => ({
        title: "Creation successful",
        description: `${sizeType.name} size type has been created`,
      }),
      error: errorToastOptions,
    });
    if (!promise) return;
    try {
      await promise.unwrap();
      reset(emptySizeType);
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
          <Fieldset.Legend>Size type details</Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide the size type details below.
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

        <Fieldset.Root invalid={!!errors.sizes?.root?.message}>
          <Fieldset.Legend>Sizes</Fieldset.Legend>
          {fields.map((field, index) => (
            <Fieldset.Content
              p={4}
              borderWidth={"thin"}
              key={field.id}
              alignItems={"end"}
              borderRadius={"md"}
              flexDirection={"row"}
            >
              <Field.Root required invalid={!!errors?.sizes?.[index]?.value}>
                <Field.Label>
                  Size <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  placeholder="e.g., XL"
                  {...register(`sizes.${index}.value`)}
                />
                <Field.ErrorText>
                  {errors?.sizes?.[index]?.value?.message}
                </Field.ErrorText>
              </Field.Root>

              <IconButton
                size="sm"
                type="button"
                variant="subtle"
                onClick={() => remove(index)}
              >
                <LuTrash2 />
              </IconButton>
            </Fieldset.Content>
          ))}

          <Button
            size="sm"
            type="button"
            variant="outline"
            alignSelf="flex-start"
            onClick={() => append(emptySize)}
          >
            <LuPlus /> Add size
          </Button>

          <Fieldset.ErrorText>{errors.sizes?.root?.message}</Fieldset.ErrorText>
        </Fieldset.Root>

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

export default ProductSizeForm;
