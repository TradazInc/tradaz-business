"use client";

import { toaster } from "@/components/ui/toaster";
import { emptyPointsConfig, pointsConfigSchema } from "@/schema/pointsConfig";
import { useAddPointsConfig } from "@/server/hooks/pointsConfig";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import {
  Button,
  Field,
  Fieldset,
  Input,
  NumberInput,
  Stack,
  useDialogContext,
} from "@chakra-ui/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

const PointsConfigForm = () => {
  const { businessId } = useParams<{ businessId?: string }>();
  const { trigger, isMutating } = useAddPointsConfig(businessId);
  const { setOpen } = useDialogContext(); // throws if the component is ever rendered outside a Dialog.Root

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: standardSchemaResolver(pointsConfigSchema),
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
      reset(emptyPointsConfig);
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
          <Fieldset.Legend>Loyalty Points Configuration</Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide the loyalty points configurations below.
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
                    Number.isNaN(field.value) ? "" : field.value.toString()
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
            <Field.ErrorText>{errors.minOrderValue?.message}</Field.ErrorText>
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
                    Number.isNaN(field.value) ? "" : field.value.toString()
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
            <Field.ErrorText>{errors.maxOrderValue?.message}</Field.ErrorText>
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
                    Number.isNaN(field.value) ? "" : field.value.toString()
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

export default PointsConfigForm;
