"use client";

import { toaster } from "@/components/ui/toaster";
import {
  CreatePointsConfigInputSchema,
  emptyPointsConfig,
} from "@/schema/pointsConfig";
import { useAddPointsConfig } from "@/hooks/pointsConfig";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import {
  Button,
  createOverlay,
  Dialog,
  Field,
  Fieldset,
  Input,
  NumberInput,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import FormButton from "./FormButton";

export const pointsConfigDialog = createOverlay((props) => {
  const { businessId } = useParams<{ businessId?: string }>();
  const { trigger, isMutating } = useAddPointsConfig(businessId);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: standardSchemaResolver(CreatePointsConfigInputSchema),
    defaultValues: emptyPointsConfig,
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (pointsConfigData) => {
    const promise = toaster.promise(trigger(pointsConfigData), {
      loading: {
        title: "Creating points config...",
        description: "Please wait",
      },
      success: (pointsConfig) => ({
        title: "Creation successful",
        description: `${pointsConfig.name} points config has been created`,
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
                  <Fieldset.Legend>
                    Loyalty Points Configuration
                  </Fieldset.Legend>
                  <Fieldset.HelperText>
                    Please provide the loyalty points configurations below.
                  </Fieldset.HelperText>
                </Stack>

                <Fieldset.Content>
                  <Field.Root required invalid={!!errors.name}>
                    <Field.Label>
                      Name <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder="e.g., Gold" {...register("name")} />
                    <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                  </Field.Root>

                  <Field.Root required invalid={!!errors.minOrderValue}>
                    <Field.Label>
                      Mininum order value
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Controller
                      control={control}
                      name={"minOrderValue"}
                      render={({ field }) => (
                        <NumberInput.Root
                          w={"full"}
                          name={field.name}
                          disabled={field.disabled}
                          defaultValue={"0"}
                          value={
                            Number.isNaN(field.value)
                              ? ""
                              : field.value.toString()
                          }
                          onValueChange={({ valueAsNumber }) =>
                            field.onChange(valueAsNumber)
                          }
                        >
                          <NumberInput.Control />
                          <NumberInput.Input onBlur={field.onBlur} />
                        </NumberInput.Root>
                      )}
                    />
                    <Field.ErrorText>
                      {errors.minOrderValue?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  <Field.Root required invalid={!!errors.maxOrderValue}>
                    <Field.Label>
                      Maximum order value
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Controller
                      control={control}
                      name={"maxOrderValue"}
                      render={({ field }) => (
                        <NumberInput.Root
                          w={"full"}
                          name={field.name}
                          disabled={field.disabled}
                          defaultValue={"0"}
                          value={
                            Number.isNaN(field.value)
                              ? ""
                              : field.value.toString()
                          }
                          onValueChange={({ valueAsNumber }) =>
                            field.onChange(valueAsNumber)
                          }
                        >
                          <NumberInput.Control />
                          <NumberInput.Input onBlur={field.onBlur} />
                        </NumberInput.Root>
                      )}
                    />
                    <Field.ErrorText>
                      {errors.maxOrderValue?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  <Field.Root required invalid={!!errors.rewardPercentage}>
                    <Field.Label>
                      Reward percentage %
                      <Field.RequiredIndicator />
                    </Field.Label>
                    <Controller
                      control={control}
                      name={"rewardPercentage"}
                      render={({ field }) => (
                        <NumberInput.Root
                          w={"full"}
                          name={field.name}
                          disabled={field.disabled}
                          defaultValue={"0"}
                          value={
                            Number.isNaN(field.value)
                              ? ""
                              : field.value.toString()
                          }
                          onValueChange={({ valueAsNumber }) =>
                            field.onChange(valueAsNumber)
                          }
                        >
                          <NumberInput.Control />
                          <NumberInput.Input onBlur={field.onBlur} />
                        </NumberInput.Root>
                      )}
                    />
                    <Field.ErrorText>
                      {errors.rewardPercentage?.message}
                    </Field.ErrorText>
                  </Field.Root>
                </Fieldset.Content>

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

export const PointsConfigForm = () => {
  return (
    <FormButton
      onClick={() => {
        pointsConfigDialog.open("points-config-form", {});
      }}
    >
      <LuPlus />
      New Configs
    </FormButton>
  );
};

export const PointsConfigFormViewport = pointsConfigDialog.Viewport;
