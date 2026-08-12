"use client";

import { toaster } from "@/components/ui/toaster";
import { emptySize } from "@/data/productSizeForm";
import { sizeTypeSchema } from "@/schema/sizeType";
import { useAddSizeTypes } from "@/server/hooks/sizeType";
import { errorOptions } from "@/utilities/errorToastOptions";
import {
  Button,
  Field,
  Fieldset,
  IconButton,
  Input,
  Stack,
} from "@chakra-ui/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useFieldArray, useForm } from "react-hook-form";
import { LuPlus, LuTrash2 } from "react-icons/lu";

const ProductCategoryForm = () => {
  const { trigger, isMutating } = useAddSizeTypes();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: standardSchemaResolver(sizeTypeSchema),
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes",
  });

  const onSubmit = handleSubmit(async (sizeTypeData) => {
    toaster.promise(trigger(sizeTypeData), {
      loading: { title: "Creating size type...", description: "Please wait" },
      success: (sizeType) => ({
        title: "Creation successful",
        description: `${sizeType.name} size type has been created`,
      }),
      error: errorOptions,
    });
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

        <Fieldset.Root invalid={!!errors?.root?.message}>
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
              <Field.Root required invalid={!!errors?.sizes}>
                <Field.Label>
                  Size <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  placeholder="e.g., XL"
                  {...register(`sizes.${index}.name`)}
                />
                <Field.ErrorText>
                  {errors?.sizes?.[index]?.message}
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

          <Fieldset.ErrorText>{errors?.root?.message}</Fieldset.ErrorText>
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

export default ProductCategoryForm;
