"use client";

import { toaster } from "@/components/ui/toaster";
import { useBanks } from "@/hooks/banks";
import { useCountries } from "@/hooks/country";
import { useAddSubaccount } from "@/hooks/subaccount";
import { Gateway } from "@/schema/enums";
import {
  CreateSubaccountInputSchema,
  emptySubaccount,
} from "@/schema/subaccount";
import { computePath } from "@/utilities/computePath";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import {
  Button,
  createListCollection,
  Field,
  Fieldset,
  Input,
  Portal,
  Select,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import FormInputGrid from "../shared/FormInputGrid";

const DEFAULT_COUNTRY = "nigeria";

const gatewayCollection = createListCollection({
  items: [
    { label: "Paystack", value: Gateway.paystack },
    { label: "Moniepoint", value: Gateway.moniepoint },
    { label: "Opay", value: Gateway.opay },
  ],
});

const SubaccountForm = () => {
  const { businessId } = useParams<{ businessId?: string }>();
  const { trigger, isMutating } = useAddSubaccount(businessId);
  const { refresh, push } = useRouter();
  const [country, setCountry] = useState(DEFAULT_COUNTRY);

  const {
    reset,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: standardSchemaResolver(CreateSubaccountInputSchema),
    defaultValues: emptySubaccount,
    mode: "onBlur",
  });

  const gateway = useWatch({ control, name: "gateway" });
  const isPaystack = gateway === Gateway.paystack;

  // Countries are only needed to narrow down Paystack banks
  const countries = useCountries(isPaystack ? { gateway } : null);
  const banks = useBanks(
    gateway ? { gateway, country: isPaystack ? country : undefined } : null,
  );

  const countryCollection = useMemo(
    () =>
      createListCollection({
        items: countries.data?.flatMap((page) => page.data) ?? [],
        itemToValue: (item) => item.name.toLowerCase(),
        itemToString: (item) => item.name,
      }),
    [countries.data],
  );

  const bankCollection = useMemo(
    () =>
      createListCollection({
        items: banks.data?.flatMap((page) => page.data) ?? [],
        itemToValue: (item) => item.code,
        itemToString: (item) => item.name,
      }),
    [banks.data],
  );

  const hasMoreBanks = !!banks.data?.at(-1)?.meta?.next;

  const clearBank = () =>
    setValue("bankCode", "", { shouldValidate: false, shouldDirty: true });

  const onSubmit = handleSubmit(async (subaccountData) => {
    const promise = toaster.promise(trigger(subaccountData), {
      loading: {
        title: "Creating subaccount...",
        description: "Please wait",
      },
      success: (subaccount) => ({
        title: "Creation successful",
        description: `${subaccount.gateway} subaccount has been created`,
      }),
      error: errorToastOptions,
    });
    if (!promise) return;
    try {
      await promise.unwrap();
      reset(emptySubaccount);
      setCountry(DEFAULT_COUNTRY);
      refresh();
      push(`${computePath(businessId)}/subaccounts`);
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
          <Fieldset.Legend>Subaccounts</Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide the settlement account details below.
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
                    disabled={field.disabled}
                    value={field.value ? [field.value] : []}
                    onValueChange={({ value }) => {
                      field.onChange(value[0]);
                      field.onBlur();
                      clearBank();
                    }}
                    onInteractOutside={() => field.onBlur()}
                    collection={gatewayCollection}
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder="Select gateway" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content>
                          {gatewayCollection.items.map((item) => (
                            <Select.Item item={item} key={item.value}>
                              {item.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                )}
              />
              <Field.HelperText>
                Payment gateway that will settle into this account
              </Field.HelperText>
              <Field.ErrorText>{errors.gateway?.message}</Field.ErrorText>
            </Field.Root>

            {isPaystack && (
              <Field.Root required invalid={!!countries.error}>
                <Field.Label>
                  Country <Field.RequiredIndicator />
                </Field.Label>
                <Select.Root
                  value={[country]}
                  onValueChange={({ value }) => {
                    setCountry(value[0] ?? DEFAULT_COUNTRY);
                    clearBank();
                  }}
                  collection={countryCollection}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select country" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      {countries.isLoading ? (
                        <Spinner size="sm" />
                      ) : (
                        <Select.Indicator />
                      )}
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {countryCollection.items.map((item) => (
                          <Select.Item item={item} key={item.id}>
                            {item.name}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
                {countries.error && (
                  <Button
                    w={"full"}
                    size={"sm"}
                    type={"button"}
                    variant={"subtle"}
                    onClick={() => countries.mutate()}
                  >
                    Click to retry
                  </Button>
                )}
                <Field.HelperText>
                  Country the bank is located in
                </Field.HelperText>
                <Field.ErrorText>
                  Countries unavailable. Retry to continue.
                </Field.ErrorText>
              </Field.Root>
            )}

            <Field.Root required invalid={!!errors.bankCode || !!banks.error}>
              <Field.Label>
                Bank <Field.RequiredIndicator />
              </Field.Label>
              <Controller
                control={control}
                name={"bankCode"}
                render={({ field }) => (
                  <Select.Root
                    name={field.name}
                    disabled={field.disabled || !gateway}
                    value={field.value ? [field.value] : []}
                    onValueChange={({ value }) => {
                      field.onChange(value[0] ?? "");
                      field.onBlur();
                    }}
                    onInteractOutside={() => field.onBlur()}
                    collection={bankCollection}
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder="Select bank" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.ClearTrigger />
                        {banks.isLoading ? (
                          <Spinner size="sm" />
                        ) : (
                          <Select.Indicator />
                        )}
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content>
                          {bankCollection.items.map((bank) => (
                            <Select.Item item={bank} key={bank.code}>
                              {bank.name}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                          {hasMoreBanks && (
                            <Button
                              w={"full"}
                              size={"sm"}
                              type={"button"}
                              variant={"ghost"}
                              loading={banks.isValidating}
                              onClick={() => banks.setSize(banks.size + 1)}
                            >
                              Load more banks
                            </Button>
                          )}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                )}
              />
              {banks.error && (
                <Button
                  w={"full"}
                  size={"sm"}
                  type={"button"}
                  variant={"subtle"}
                  onClick={() => banks.mutate()}
                >
                  Click to retry
                </Button>
              )}
              <Field.HelperText>Bank that holds the account</Field.HelperText>
              <Field.ErrorText>
                {banks.error
                  ? "Banks unavailable. Retry to continue."
                  : errors.bankCode?.message}
              </Field.ErrorText>
            </Field.Root>

            <Field.Root required invalid={!!errors.accountNumber}>
              <Field.Label>
                Account number <Field.RequiredIndicator />
              </Field.Label>
              <Input
                inputMode="numeric"
                maxLength={10}
                placeholder="e.g., 0123456789"
                {...register("accountNumber")}
              />
              <Field.HelperText>10 digit account number</Field.HelperText>
              <Field.ErrorText>{errors.accountNumber?.message}</Field.ErrorText>
            </Field.Root>
          </FormInputGrid>
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

export default SubaccountForm;
