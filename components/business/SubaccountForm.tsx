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
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { parseCursorData } from "@/utilities/parsePageData";
import {
  Button,
  createListCollection,
  createOverlay,
  Dialog,
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
import { useId, useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import InfiniteScroll from "react-infinite-scroll-component";
import FormInputGrid from "../shared/FormInputGrid";

export const subaccountDialog = createOverlay((props) => {
  const { businessId } = useParams<{ businessId?: string }>();
  const { trigger, isMutating } = useAddSubaccount(businessId);
  const { refresh } = useRouter();
  const [country, setCountry] = useState("nigeria");
  const bankScrollId = useId();

  const {
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
  const banks = useBanks(gateway ? { gateway, country } : null);

  // Parse paged data
  const parsedCountries = useMemo(
    () => parseCursorData(countries.data),
    [countries.data],
  );
  const parsedBanks = useMemo(() => parseCursorData(banks.data), [banks.data]);

  const gatewayCollection = useMemo(
    () =>
      createListCollection({
        items: [
          { label: "Paystack", value: Gateway.paystack },
          { label: "Moniepoint", value: Gateway.moniepoint },
          { label: "Opay", value: Gateway.opay },
        ],
      }),
    [],
  );
  const countryCollection = useMemo(
    () =>
      createListCollection({
        items: parsedCountries.flatData,
        itemToValue: (item) => item.name.toLowerCase(),
        itemToString: (item) => item.name,
      }),
    [countries.data],
  );
  const bankCollection = useMemo(
    () =>
      createListCollection({
        items: parsedBanks.flatData,
        itemToValue: (item) => item.code,
        itemToString: (item) => item.name,
      }),
    [banks.data],
  );

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
      refresh();
      props.onOpenChange?.({ open: false });
    } catch {} // Error displayed by toaster
  });

  return (
    <Dialog.Root {...props}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Fieldset.Root
              w={"full"}
              size={"lg"}
              mx={"auto"}
              px={{ base: 4, md: 0 }}
              maxW={{ base: "full", md: "2xl", xl: "4xl" }}
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

                  <Field.Root
                    required
                    disabled={!isPaystack}
                    invalid={!!countries.error}
                  >
                    <Field.Label>
                      Country <Field.RequiredIndicator />
                    </Field.Label>
                    <Select.Root
                      value={[country]}
                      onValueChange={({ value }) => {
                        setCountry(value[0]);
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
                        loading={countries.isLoading}
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

                  <Field.Root
                    required
                    invalid={!!errors.bankCode || !!banks.error}
                  >
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
                          <Select.Positioner>
                            <Select.Content id={bankScrollId}>
                              <InfiniteScroll
                                dataLength={parsedBanks.flatData.length}
                                hasMore={parsedBanks.hasMore && !banks.error}
                                next={() => banks.setSize(banks.size + 1)}
                                loader={<Spinner size={"xs"} />}
                                scrollableTarget={bankScrollId}
                              >
                                {bankCollection.items.map((bank) => (
                                  <Select.Item item={bank} key={bank.code}>
                                    {bank.name}
                                    <Select.ItemIndicator />
                                  </Select.Item>
                                ))}
                              </InfiniteScroll>
                            </Select.Content>
                          </Select.Positioner>
                        </Select.Root>
                      )}
                    />
                    {banks.error && (
                      <Button
                        w={"full"}
                        size={"sm"}
                        type={"button"}
                        variant={"subtle"}
                        loading={banks.isLoading}
                        onClick={() => banks.mutate()}
                      >
                        Click to retry
                      </Button>
                    )}
                    <Field.HelperText>
                      Bank that holds the account
                    </Field.HelperText>
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
                    <Field.ErrorText>
                      {errors.accountNumber?.message}
                    </Field.ErrorText>
                  </Field.Root>
                </FormInputGrid>
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
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});

export const SubaccountForm = () => {
  return (
    <Button
      size={"xs"}
      variant={"outline"}
      onClick={() => {
        subaccountDialog.open("subaccount-form", {});
      }}
    >
      <LuPlus />
      Add Subaccount
    </Button>
  );
};

export const SubaccountFormViewport = subaccountDialog.Viewport;
