"use client";

import { toaster } from "@/components/ui/toaster";
import { MAX_FILE_SIZE } from "@/data/constants";
import { useAddExpense } from "@/hooks/expense";
import { useStores } from "@/hooks/store";
import { CreateExpenseInputSchema, emptyExpense } from "@/schema/expense";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import {
  Button,
  createListCollection,
  Field,
  Fieldset,
  Input,
  NumberInput,
  Portal,
  Select,
  Spinner,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import FileUpload from "../shared/FileUpload";
import FormInputGrid from "../shared/FormInputGrid";

const ExpenseForm = () => {
  const { businessId } = useParams<{ businessId?: string }>();
  const { trigger, isMutating } = useAddExpense(businessId);
  const { data, isLoading, error, mutate } = useStores(businessId);

  const storeCollection = useMemo(
    () =>
      createListCollection({
        items: data ?? [],
        itemToValue: (item) => item?.id,
        itemToString: (item) => item.name,
      }),
    [data],
  );

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: standardSchemaResolver(CreateExpenseInputSchema),
    defaultValues: emptyExpense,
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (expenseData) => {
    const promise = toaster.promise(trigger(expenseData), {
      loading: {
        title: "Creating expense...",
        description: "Please wait",
      },
      success: (expense) => ({
        title: "Creation successful",
        description: `${expense.name} expense has been created`,
      }),
      error: errorToastOptions,
    });
    if (!promise) return;
    try {
      await promise.unwrap();
      reset(emptyExpense);
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
          <Fieldset.Legend>Expenses</Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide the expense details below.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Controller
            control={control}
            name={"recieptUrl"}
            render={({ field, fieldState }) => (
              <Field.Root required invalid={!!fieldState.error}>
                <Field.Label>
                  Receipt <Field.RequiredIndicator />
                </Field.Label>
                <FileUpload
                  maxFiles={1}
                  slidesPerPage={1}
                  maxFileSize={MAX_FILE_SIZE}
                  disabled={field.disabled}
                  value={field.value ? [field.value] : []}
                  onValueChange={(urls) => {
                    field.onChange(urls.at(-1) ?? "");
                    field.onBlur();
                  }}
                />
                {field.value && (
                  <Button
                    w={"full"}
                    size={"sm"}
                    type={"button"}
                    variant={"subtle"}
                    onClick={() => {
                      field.onChange("");
                      field.onBlur();
                    }}
                  >
                    Remove receipt
                  </Button>
                )}
                <Field.HelperText>
                  Upload a photo of the expense receipt
                </Field.HelperText>
                <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
              </Field.Root>
            )}
          />

          <FormInputGrid>
            <Field.Root required invalid={!!errors.name}>
              <Field.Label>
                Name <Field.RequiredIndicator />
              </Field.Label>
              <Input placeholder="e.g., Store rent" {...register("name")} />
              <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root required invalid={!!errors.amount}>
              <Field.Label>
                Amount <Field.RequiredIndicator />
              </Field.Label>
              <Controller
                control={control}
                name={"amount"}
                render={({ field }) => (
                  <NumberInput.Root
                    min={0}
                    step={0.01}
                    w={"full"}
                    name={field.name}
                    disabled={field.disabled}
                    formatOptions={{
                      style: "currency",
                      currency: "NGN",
                      currencyDisplay: "symbol",
                      currencySign: "accounting",
                      maximumFractionDigits: 2,
                    }}
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
              <Field.ErrorText>{errors.amount?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.teamId || error}>
              <Field.Label>Store</Field.Label>
              <Controller
                control={control}
                name={"teamId"}
                render={({ field }) => (
                  <Select.Root
                    name={field.name}
                    disabled={field.disabled}
                    value={field.value ? [field.value] : []}
                    onValueChange={({ value }) => {
                      field.onChange(value[0]);
                      field.onBlur();
                    }}
                    onInteractOutside={() => field.onBlur()}
                    collection={storeCollection}
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder="Select store" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.ClearTrigger />
                        {isLoading ? (
                          <Spinner size="sm" />
                        ) : (
                          <Select.Indicator />
                        )}
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content>
                          {storeCollection.items.map((store) => (
                            <Select.Item item={store} key={store.id}>
                              {store.name}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                )}
              />
              {error && (
                <Button
                  w={"full"}
                  size={"sm"}
                  type={"button"}
                  variant={"subtle"}
                  onClick={() => mutate()}
                >
                  Click to retry
                </Button>
              )}
              <Field.HelperText>
                Store the expense belongs to. Leave empty for a business wide
                expense
              </Field.HelperText>
              <Field.ErrorText>
                {error
                  ? "Stores unavailable. Retry to continue."
                  : errors.teamId?.message}
              </Field.ErrorText>
            </Field.Root>
          </FormInputGrid>

          <Field.Root required invalid={!!errors.description}>
            <Field.Label>
              Description <Field.RequiredIndicator />
            </Field.Label>
            <Textarea
              autoresize
              placeholder="e.g., Rent for the month of March"
              {...register("description")}
            />
            <Field.HelperText>
              A short description of the expense
            </Field.HelperText>
            <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
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

export default ExpenseForm;
