"use client";

import { toaster } from "@/components/ui/toaster";
import { useAddSizeTypes } from "@/hooks/sizeType";
import {
  CreateSizeTypeInputSchema,
  emptySize,
  emptySizeType,
} from "@/schema/sizeType";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import {
  Button,
  createOverlay,
  Dialog,
  Field,
  Fieldset,
  IconButton,
  Input,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useParams } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import FormButton from "../shared/FormButton";

export const productSizeDialog = createOverlay((props) => {
  const { businessId } = useParams<{ businessId?: string }>();
  const { trigger, isMutating } = useAddSizeTypes(businessId);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: standardSchemaResolver(CreateSizeTypeInputSchema),
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
      props.onOpenChange?.({ open: false });
    } catch {} // Error displayed by toaster
  });

  return (
    <Dialog.Root {...props} size={"lg"} lazyMount>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Body>
              <Fieldset.Root
                w={"full"}
                size={"lg"}
                mx={"auto"}
                px={{ base: 4, md: 0 }}
                maxW={{ base: "full", md: "2xl", xl: "4xl" }}
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
                    <Input
                      placeholder="e.g., Footwears"
                      {...register("name")}
                    />
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
                      <Field.Root
                        required
                        invalid={!!errors?.sizes?.[index]?.value}
                      >
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

                  <Fieldset.ErrorText>
                    {errors.sizes?.root?.message}
                  </Fieldset.ErrorText>
                </Fieldset.Root>

                <Button
                  onClick={onSubmit}
                  variant={"outline"}
                  alignSelf={"flex-start"}
                  disabled={!isValid || isSubmitting || isMutating}
                  loading={isSubmitting || isMutating}
                >
                  Submit
                </Button>
              </Fieldset.Root>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});

export const ProductSizeForm = () => {
  return (
    <FormButton
      onClick={() => {
        productSizeDialog.open("product-size-form", {});
      }}
    >
      <LuPlus />
      New Product Size
    </FormButton>
  );
};

export const ProductSizeFormViewport = productSizeDialog.Viewport;
