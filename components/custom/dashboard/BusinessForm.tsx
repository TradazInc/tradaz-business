"use client";

import { toaster } from "@/components/ui/toaster";
import { lastStep, steps } from "@/data/businessFormSteps";
import { businessSchema } from "@/schema/business";
import { useAddBusiness } from "@/server/hooks/business";
import { useBusinessCategories } from "@/server/hooks/businessCategory";
import { errorOptions } from "@/utilities/errorToastOptions";
import { parseCursorData } from "@/utilities/parsePagedData";
import {
  Box,
  Button,
  ButtonGroup,
  CloseButton,
  createListCollection,
  Field,
  Fieldset,
  FileUpload,
  Input,
  InputGroup,
  Select,
  Spinner,
  Steps,
} from "@chakra-ui/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LuFileUp } from "react-icons/lu";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHookFormMask } from "use-mask-input";
import { useDialogContext } from "@chakra-ui/react";

interface Props {
  signup?: string;
}

export const BusinessForm = ({ signup }: Props) => {
  const { data, isLoading, size, setSize, error, mutate } =
    useBusinessCategories();
  const { trigger, isMutating } = useAddBusiness();
  const [step, setStep] = useState(0);
  const categoryScrollId = useId();

  const { refresh, push, replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setOpen } = useDialogContext(); // throws if the component is ever rendered outside a Dialog.Root

  // Parse paged data
  const { flatData, hasMore } = useMemo(() => parseCursorData(data), [data]);

  // Create collection data (chakra)
  const categoryCollection = useMemo(
    () =>
      createListCollection({
        items: flatData,
        itemToValue: (item) => item?.id,
        itemToString: (item) => item.name,
      }),
    [flatData],
  );

  // Initialize hook form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: standardSchemaResolver(businessSchema),
    mode: "onBlur",
  });

  const withMask = useHookFormMask(register);

  const onSubmit = handleSubmit(async (businessData) => {
    const promise = toaster.promise(trigger(businessData), {
      loading: { title: "Setting up brand…", description: "Please wait" },
      success: (brand) => ({
        title: "Setup successful",
        description: `${brand.name} brand has been created`,
      }),
      error: errorOptions,
    });
    if (!promise) return;
    try {
      const business = await promise.unwrap();
      refresh();
      push(`/dashboard/business/${business.id}`);
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
    <Steps.Root
      size={"sm"}
      step={step}
      onStepChange={(e) => setStep(e.step)}
      count={lastStep}
    >
      <Steps.List>
        {steps.map((step, index) => (
          <Steps.Item key={index} index={index} py={3}>
            <Steps.Trigger>
              <Steps.Indicator />
              <Box>
                <Steps.Title>{step.title}</Steps.Title>
                <Steps.Description>{step.description}</Steps.Description>
              </Box>
            </Steps.Trigger>
            <Steps.Separator />
          </Steps.Item>
        ))}
      </Steps.List>

      <form id={"business-form"} onSubmit={onSubmit} style={{ width: "100%" }}>
        <Fieldset.Root
          w={"full"}
          mx={"auto"}
          size={"lg"}
          px={{ base: 4, md: 0 }}
          maxW={{ base: "full", md: "2xl", xl: "4xl" }}
        >
          <Fieldset.Content>
            {step === 0 && (
              <>
                <Field.Root required invalid={!!errors.name}>
                  <Field.Label>
                    Name <Field.RequiredIndicator />
                  </Field.Label>
                  <Input placeholder="e.g., Tradaz" {...register("name")} />
                  <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                </Field.Root>

                <FileUpload.Root
                  gap={"1.5"}
                  maxFiles={1}
                  accept={["image/png"]}
                >
                  <FileUpload.HiddenInput />
                  <FileUpload.Label>Upload logo</FileUpload.Label>
                  <InputGroup
                    startElement={<LuFileUp />}
                    endElement={
                      <FileUpload.ClearTrigger asChild>
                        <CloseButton
                          me="-1"
                          size="xs"
                          variant="plain"
                          focusVisibleRing="inside"
                          focusRingWidth="2px"
                          pointerEvents="auto"
                        />
                      </FileUpload.ClearTrigger>
                    }
                  >
                    <Input asChild>
                      <FileUpload.Trigger>
                        <FileUpload.FileText lineClamp={1} />
                      </FileUpload.Trigger>
                    </Input>
                  </InputGroup>
                </FileUpload.Root>

                <Field.Root required invalid={!!errors.categoryId || error}>
                  <Field.Label>
                    Brand category <Field.RequiredIndicator />
                  </Field.Label>
                  <Controller
                    control={control}
                    name={"categoryId"}
                    render={({ field }) => (
                      <Select.Root
                        name={field.name}
                        value={field.value}
                        collection={categoryCollection}
                        onValueChange={({ value }) => {
                          field.onChange(value);
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
                            {isLoading ? (
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
                              hasMore={hasMore && !error}
                              next={() => setSize(size + 1)}
                              loader={<Spinner size={"xs"} />}
                              scrollableTarget={categoryScrollId}
                            >
                              {categoryCollection.size > 0 ? (
                                categoryCollection.items.map((category) => (
                                  <Select.Item
                                    item={category}
                                    key={category.id}
                                  >
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
                  {error && (
                    <Button
                      w={"full"}
                      size={"sm"}
                      variant={"subtle"}
                      onClick={() => mutate()}
                    >
                      Click to retry
                    </Button>
                  )}
                  <Field.ErrorText>
                    {error
                      ? "Categories unavailable. Retry to continue."
                      : errors.categoryId?.message}
                  </Field.ErrorText>
                </Field.Root>
              </>
            )}
            {step === 1 && (
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
            )}
          </Fieldset.Content>
        </Fieldset.Root>
      </form>

      <ButtonGroup size={"sm"} variant={"outline"}>
        <Steps.PrevTrigger asChild>
          <Button disabled={isSubmitting}>Prev</Button>
        </Steps.PrevTrigger>
        <Steps.NextTrigger asChild>
          {step === lastStep ? (
            <Button
              type={"submit"}
              form={"business-form"}
              disabled={!isValid || isSubmitting || isMutating}
              loading={isSubmitting || isMutating}
            >
              Submit
            </Button>
          ) : (
            <Button disabled={isSubmitting || isMutating}>Next</Button>
          )}
        </Steps.NextTrigger>
      </ButtonGroup>
    </Steps.Root>
  );
};
