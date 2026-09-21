"use client";

import { PasswordInput } from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster";
import { useAddPosConfig } from "@/hooks/posConfig";
import { Gateway } from "@/schema/enums";
import {
  CreatePosConfigInputSchema,
  emptyPosConfig,
  emptyTerminalConfig,
} from "@/schema/posConfig";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import {
  Button,
  createListCollection,
  Field,
  Fieldset,
  IconButton,
  Input,
  Portal,
  Select,
  Stack,
  useDialogContext,
} from "@chakra-ui/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useParams } from "next/navigation";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import FormInputGrid from "../shared/FormInputGrid";

const PosConfigForm = () => {
  const { businessId } = useParams<{ businessId?: string }>();
  const { trigger, isMutating } = useAddPosConfig(businessId);
  // throws if the component is ever rendered outside a Dialog.Root
  const { setOpen } = useDialogContext();

  const gatewayCollection = createListCollection({
    items: [
      { label: "Opay", value: Gateway.opay },
      { label: "Moniepoint", value: Gateway.moniepoint },
      { label: "Paystack", value: Gateway.paystack },
    ],
  });

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: standardSchemaResolver(CreatePosConfigInputSchema),
    defaultValues: emptyPosConfig,
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "terminalConfigs",
  });

  const onSubmit = handleSubmit(async (posConfigData) => {
    const promise = toaster.promise(trigger(posConfigData), {
      loading: { title: "Creating pos config...", description: "Please wait" },
      success: (posConfig) => ({
        title: "Creation successful",
        description: `${posConfig.gateway} pos config has been created`,
      }),
      error: errorToastOptions,
    });
    if (!promise) return;
    try {
      await promise.unwrap();
      reset(emptyPosConfig);
      setOpen(false);
    } catch {} // Error displayed by toaster
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
          <Fieldset.Legend>Pos config details</Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide the pos config details below.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <FormInputGrid>
            <Field.Root required invalid={!!errors.gateway}>
              <Field.Label>
                Gateway <Field.RequiredIndicator />
              </Field.Label>
              <Controller
                control={control}
                name={"gateway"}
                render={({ field }) => (
                  <Select.Root
                    name={field.name}
                    value={[field.value]}
                    onValueChange={({ value }) => {
                      field.onChange(value[0]);
                      field.onBlur();
                    }}
                    onInteractOutside={() => field.onBlur()}
                    collection={gatewayCollection}
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder={"Select gateway"} />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content>
                          {gatewayCollection.items.map((gateway) => (
                            <Select.Item item={gateway} key={gateway.value}>
                              {gateway.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                )}
              />
              <Field.ErrorText>{errors.gateway?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root required invalid={!!errors.merchantId}>
              <Field.Label>
                Merchant ID <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder="e.g., MER_123456"
                {...register("merchantId")}
              />
              <Field.ErrorText>{errors.merchantId?.message}</Field.ErrorText>
            </Field.Root>
          </FormInputGrid>

          <Field.Root required invalid={!!errors.privateKey}>
            <Field.Label>
              Private key <Field.RequiredIndicator />
            </Field.Label>
            <PasswordInput
              placeholder="e.g., sk_live_xxxxxxxx"
              {...register("privateKey")}
            />
            <Field.HelperText>
              Issued by your payment gateway. Kept secret.
            </Field.HelperText>
            <Field.ErrorText>{errors.privateKey?.message}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>

        <Fieldset.Root invalid={!!errors.terminalConfigs?.root?.message}>
          <Fieldset.Legend>Terminals</Fieldset.Legend>
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
                invalid={!!errors?.terminalConfigs?.[index]?.name}
              >
                <Field.Label>
                  Name <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  placeholder="e.g., Counter 1"
                  {...register(`terminalConfigs.${index}.name`)}
                />
                <Field.ErrorText>
                  {errors?.terminalConfigs?.[index]?.name?.message}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root
                required
                invalid={!!errors?.terminalConfigs?.[index]?.serialNumber}
              >
                <Field.Label>
                  Serial number <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  placeholder="e.g., 2059FT00123"
                  {...register(`terminalConfigs.${index}.serialNumber`)}
                />
                <Field.ErrorText>
                  {errors?.terminalConfigs?.[index]?.serialNumber?.message}
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
            onClick={() => append(emptyTerminalConfig)}
          >
            <LuPlus /> Add terminal
          </Button>

          <Fieldset.ErrorText>
            {errors.terminalConfigs?.root?.message}
          </Fieldset.ErrorText>
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

export default PosConfigForm;
