"use client";

import { toaster } from "@/components/ui/toaster";
import { couponSchema, emptyCoupon } from "@/schema/coupon";
import { DiscountType } from "@/server/entities/coupons";
import { useAddCoupon } from "@/server/hooks/coupon";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import {
  Button,
  Checkbox,
  createListCollection,
  DatePicker,
  Field,
  Fieldset,
  Input,
  NumberInput,
  parseDate,
  Portal,
  Select,
  Stack,
  useDialogContext,
} from "@chakra-ui/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { LuCalendar } from "react-icons/lu";

const CouponForm = () => {
  const { businessId } = useParams<{ businessId?: string }>();
  const { trigger, isMutating } = useAddCoupon(businessId);
  const { setOpen } = useDialogContext(); // throws if the component is ever rendered outside a Dialog.Root

  const discountTypeCollection = createListCollection({
    items: [
      { label: "Fixed", value: DiscountType.fixed },
      { label: "Percentage", value: DiscountType.percentage },
    ],
  });

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: standardSchemaResolver(couponSchema),
    defaultValues: emptyCoupon,
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (couponData) => {
    const promise = toaster.promise(trigger(couponData), {
      loading: {
        title: "Creating coupon...",
        description: "Please wait",
      },
      success: (coupon) => ({
        title: "Creation successful",
        description: `${coupon.name} points config has been created`,
      }),
      error: errorToastOptions,
    });
    if (!promise) return;
    try {
      await promise.unwrap();
      reset(emptyCoupon);
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
          <Fieldset.Legend>Coupons</Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide the coupon details below.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root required invalid={!!errors.name}>
            <Field.Label>
              Name <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="e.g., Holiday" {...register("name")} />
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={!!errors.code}>
            <Field.Label>
              Code <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="e.g., ABC123" {...register("code")} />
            <Field.ErrorText>{errors.code?.message}</Field.ErrorText>
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

          <Field.Root required invalid={!!errors.usageLimit}>
            <Field.Label>
              Usage limit <Field.RequiredIndicator />
            </Field.Label>
            <Controller
              control={control}
              name={"usageLimit"}
              render={({ field }) => (
                <NumberInput.Root
                  w={"full"}
                  name={field.name}
                  disabled={field.disabled}
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
            <Field.ErrorText>{errors.usageLimit?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={!!errors.discountValue}>
            <Field.Label>
              Discount value <Field.RequiredIndicator />
            </Field.Label>
            <Controller
              control={control}
              name={"discountValue"}
              render={({ field }) => (
                <NumberInput.Root
                  w={"full"}
                  name={field.name}
                  disabled={field.disabled}
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
            <Field.ErrorText>{errors.discountValue?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={!!errors.discountType}>
            <Field.Label>
              Discount type <Field.RequiredIndicator />
            </Field.Label>
            <Controller
              control={control}
              name={"discountType"}
              render={({ field }) => (
                <Select.Root
                  name={field.name}
                  value={[field.value]}
                  onValueChange={({ value }) => {
                    field.onChange(value[0]);
                    field.onBlur();
                  }}
                  onInteractOutside={() => field.onBlur()}
                  collection={discountTypeCollection}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder={"Select discountType"} />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {discountTypeCollection.items.map((discountType) => (
                          <Select.Item
                            item={discountType}
                            key={discountType.value}
                          >
                            {discountType.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              )}
            />
            <Field.ErrorText>{errors.discountType?.message}</Field.ErrorText>
          </Field.Root>

          <Controller
            control={control}
            name="isActive"
            render={({ field }) => (
              <Field.Root invalid={!!errors.isActive} disabled={field.disabled}>
                <Checkbox.Root
                  checked={field.value}
                  onCheckedChange={({ checked }) => field.onChange(checked)}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>Active</Checkbox.Label>
                </Checkbox.Root>
                <Field.ErrorText>{errors.isActive?.message}</Field.ErrorText>
              </Field.Root>
            )}
          />

          <Controller
            control={control}
            name="startsAt"
            render={({ field }) => (
              <Field.Root invalid={!!errors.startsAt}>
                <DatePicker.Root
                  value={field.value ? [parseDate(field.value)] : []}
                  onValueChange={(e) =>
                    field.onChange(e.value[0]?.toString() ?? "")
                  }
                  invalid={!!errors.startsAt}
                >
                  <DatePicker.Label>Start date</DatePicker.Label>
                  <DatePicker.Control>
                    <DatePicker.Input placeholder="Select date" />
                    <DatePicker.IndicatorGroup>
                      <DatePicker.Trigger>
                        <LuCalendar />
                      </DatePicker.Trigger>
                    </DatePicker.IndicatorGroup>
                  </DatePicker.Control>
                  <Portal>
                    <DatePicker.Positioner>
                      <DatePicker.Content>
                        <DatePicker.View view="day">
                          <DatePicker.Header />
                          <DatePicker.DayTable />
                        </DatePicker.View>
                        <DatePicker.View view="month">
                          <DatePicker.Header />
                          <DatePicker.MonthTable />
                        </DatePicker.View>
                        <DatePicker.View view="year">
                          <DatePicker.Header />
                          <DatePicker.YearTable />
                        </DatePicker.View>
                      </DatePicker.Content>
                    </DatePicker.Positioner>
                  </Portal>
                </DatePicker.Root>
                <Field.ErrorText>{errors.startsAt?.message}</Field.ErrorText>
              </Field.Root>
            )}
          />

          <Controller
            control={control}
            name="endsAt"
            render={({ field }) => (
              <Field.Root invalid={!!errors.endsAt}>
                <DatePicker.Root
                  value={field.value ? [parseDate(field.value)] : []}
                  onValueChange={(e) =>
                    field.onChange(e.value[0]?.toString() ?? "")
                  }
                  invalid={!!errors.endsAt}
                >
                  <DatePicker.Label>End date</DatePicker.Label>
                  <DatePicker.Control>
                    <DatePicker.Input placeholder="Select date" />
                    <DatePicker.IndicatorGroup>
                      <DatePicker.Trigger>
                        <LuCalendar />
                      </DatePicker.Trigger>
                    </DatePicker.IndicatorGroup>
                  </DatePicker.Control>
                  <Portal>
                    <DatePicker.Positioner>
                      <DatePicker.Content>
                        <DatePicker.View view="day">
                          <DatePicker.Header />
                          <DatePicker.DayTable />
                        </DatePicker.View>
                        <DatePicker.View view="month">
                          <DatePicker.Header />
                          <DatePicker.MonthTable />
                        </DatePicker.View>
                        <DatePicker.View view="year">
                          <DatePicker.Header />
                          <DatePicker.YearTable />
                        </DatePicker.View>
                      </DatePicker.Content>
                    </DatePicker.Positioner>
                  </Portal>
                </DatePicker.Root>
                <Field.ErrorText>{errors.endsAt?.message}</Field.ErrorText>
              </Field.Root>
            )}
          />
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

export default CouponForm;
