"use client";

import { toaster } from "@/components/ui/toaster";
import { useAddBusiness } from "@/hooks/business";
import { useBusinessCategories } from "@/hooks/businessCategory";
import {
  CreateBusinessInputData,
  CreateBusinessInputSchema,
} from "@/schema/business";
import { computePath } from "@/utilities/computePath";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { parseCursorData } from "@/utilities/parsePageData";
import {
  Box,
  Button,
  ButtonGroup,
  createListCollection,
  Field,
  Input,
  InputGroup,
  Select,
  Spinner,
  Steps,
  Text,
  useDialogContext,
  useSteps,
} from "@chakra-ui/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useId, useMemo } from "react";
import { Controller, FieldPath, useForm, UseFormReturn } from "react-hook-form";
import { LuCheck } from "react-icons/lu";
import { MdOutlineBusiness } from "react-icons/md";
import { TiContacts } from "react-icons/ti";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHookFormMask } from "use-mask-input";
import { z } from "zod";

interface Props {
  signup?: string;
}

export const BusinessForm = ({ signup }: Props) => {
  const { trigger, isMutating } = useAddBusiness();
  const { refresh, push, replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // throws if the component is ever rendered outside a Dialog.Root
  const { setOpen } = useDialogContext();

  const form = useForm({
    resolver: standardSchemaResolver(CreateBusinessInputSchema),
    mode: "onTouched",
  });

  const steps = useSteps({
    count: stepsData.length,
    linear: true,
    isStepValid: (index) =>
      stepsData[index]?.schema.safeParse(form.getValues()).success ?? true,
    onStepInvalid: ({ step }) =>
      form.trigger(fieldsOf(stepsData[step]), { shouldFocus: true }),
  });
  const isLastStep = steps.value === steps.count - 1;

  const onSubmit = form.handleSubmit(async (businessData) => {
    const promise = toaster.promise(trigger(businessData), {
      loading: { title: "Setting up brand…", description: "Please wait" },
      success: (brand) => ({
        title: "Setup successful",
        description: `${brand.name} brand has been created`,
      }),
      error: errorToastOptions,
    });
    if (!promise) return;
    try {
      const business = await promise.unwrap();
      refresh();
      push(computePath(business.id));
    } catch {} // Error displayed by toaster
  });

  // Open form dialog on first signup
  useEffect(() => {
    if (!signup) return;
    if (signup) setOpen(false);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("signup");
    replace(`${pathname}?${params.toString()}`);
  }, [signup]);

  return (
    <Steps.RootProvider value={steps} onSubmit={onSubmit} size={"sm"}>
      <Steps.List mt={4}>
        {stepsData.map((step, index) => (
          <Steps.Item key={index} index={index}>
            <Steps.Trigger>
              <Steps.Indicator>
                <Steps.Status incomplete={step.icon} complete={<LuCheck />} />
              </Steps.Indicator>
              <Box>
                <Steps.Title>{step.title}</Steps.Title>
                <Steps.Description>{step.description}</Steps.Description>
              </Box>
            </Steps.Trigger>
            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.List>

      {stepsData.map((step, index) => (
        <Steps.Content key={index} index={index} w={"full"}>
          {step.render(form)}
        </Steps.Content>
      ))}

      <Steps.CompletedContent>
        <Text>Registration complete!</Text>
      </Steps.CompletedContent>

      <ButtonGroup size={"sm"} variant={"outline"} mt={2}>
        <Steps.PrevTrigger asChild>
          <Button>Back</Button>
        </Steps.PrevTrigger>
        <Steps.NextTrigger asChild>
          {isLastStep ? (
            <Button
              type={"submit"}
              disabled={
                !form.formState.isValid ||
                form.formState.isSubmitting ||
                isMutating
              }
              loading={form.formState.isSubmitting || isMutating}
            >
              Submit
            </Button>
          ) : (
            <Button>Next</Button>
          )}
        </Steps.NextTrigger>
      </ButtonGroup>
    </Steps.RootProvider>
  );
};

interface StepData {
  icon: React.ReactNode;
  title: string;
  description: string;
  schema: z.ZodObject;
  render(form: UseFormReturn<CreateBusinessInputData>): React.ReactNode;
}

const fieldsOf = (step: StepData) =>
  Object.keys(step.schema.shape) as FieldPath<CreateBusinessInputData>[];

const stepsData: StepData[] = [
  {
    icon: <MdOutlineBusiness />,
    title: "Brand information",
    description: "Tell us about your brand.",
    schema: CreateBusinessInputSchema.pick({ name: true, categoryId: true }),
    render({ register, control, formState: { errors } }) {
      const categories = useBusinessCategories();
      const categoryScrollId = useId();

      const { flatData, hasMore } = useMemo(
        () => parseCursorData(categories.data),
        [categories.data],
      );

      const categoryCollection = useMemo(
        () =>
          createListCollection({
            items: flatData,
            itemToValue: (item) => item?.id,
            itemToString: (item) => item.name,
          }),
        [flatData],
      );

      return (
        <>
          <Field.Root required invalid={!!errors.name}>
            <Field.Label>
              Name <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="e.g., Tradaz" {...register("name")} />
            <Field.HelperText>Name of business</Field.HelperText>
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root
            required
            invalid={!!(errors.categoryId || categories.error)}
            mt={3}
          >
            <Field.Label>
              Brand category <Field.RequiredIndicator />
            </Field.Label>
            <Controller
              control={control}
              name={"categoryId"}
              render={({ field }) => (
                <Select.Root
                  name={field.name}
                  value={field.value ? [field.value] : []}
                  collection={categoryCollection}
                  onValueChange={({ value }) => {
                    field.onChange(value[0] ?? "");
                    field.onBlur();
                  }}
                  onInteractOutside={() => field.onBlur()}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select category" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.ClearTrigger />
                      {categories.isLoading ? (
                        <Spinner size="sm" />
                      ) : (
                        <Select.Indicator />
                      )}
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Select.Positioner>
                    <Select.Content id={categoryScrollId}>
                      <InfiniteScroll
                        dataLength={flatData.length}
                        hasMore={hasMore && !categories.error}
                        next={() => categories.setSize(categories.size + 1)}
                        loader={<Spinner size={"xs"} />}
                        scrollableTarget={categoryScrollId}
                      >
                        {categoryCollection.size > 0 ? (
                          categoryCollection.items.map((category) => (
                            <Select.Item item={category} key={category.id}>
                              {category.name}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))
                        ) : (
                          <Box>No categories found</Box>
                        )}
                      </InfiniteScroll>
                    </Select.Content>
                  </Select.Positioner>
                </Select.Root>
              )}
            />
            {categories.error && (
              <Button
                w={"full"}
                size={"sm"}
                variant={"subtle"}
                loading={categories.isLoading}
                onClick={() => categories.mutate()}
              >
                Click to retry
              </Button>
            )}
            <Field.HelperText>
              Primary industry or service type of business
            </Field.HelperText>
            <Field.ErrorText>
              {categories.error
                ? "Categories unavailable. Retry to continue."
                : errors.categoryId?.message}
            </Field.ErrorText>
          </Field.Root>
        </>
      );
    },
  },
  {
    icon: <TiContacts />,
    title: "Contact information",
    description: "How can customers reach you?",
    schema: CreateBusinessInputSchema.pick({
      slug: true,
      address: true,
      phone: true,
    }),
    render({ register, formState: { errors } }) {
      const withMask = useHookFormMask(register);

      return (
        <>
          <Field.Root required invalid={!!errors.slug}>
            <Field.Label>
              Slug <Field.RequiredIndicator />
            </Field.Label>
            <InputGroup startAddon="www." endAddon=".com">
              <Input placeholder="yoursite" {...register("slug")} />
            </InputGroup>
            <Field.ErrorText>
              <Field.ErrorIcon />
              {errors.slug?.message}
            </Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={!!errors.address}>
            <Field.Label>
              Address <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder="e.g., 123 Main St, Lekki, Lagos"
              {...register("address")}
            />
            <Field.ErrorText>{errors.address?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={!!errors.phone}>
            <Field.Label>
              Phone <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder="0812-345-6789"
              {...withMask("phone", "9999-999-9999", {
                autoUnmask: true,
              })}
            />
            <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
          </Field.Root>
        </>
      );
    },
  },
];
