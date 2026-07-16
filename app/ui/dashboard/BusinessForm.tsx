"use client";

import { lastStep, steps } from "@/data/businessFormSteps";
import { useBusinessCategories } from "@/hooks/businessCategory";
import { businessSchema } from "@/schema/business";
import { createBusiness } from "@/services/business";
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
  Portal,
  Select,
  Spinner,
  Steps,
} from "@chakra-ui/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LuFileUp } from "react-icons/lu";
import { useHookFormMask } from "use-mask-input";

export const BusinessForm = () => {
  const { data, isLoading } = useBusinessCategories();
  const { refresh, push } = useRouter();
  const [step, setStep] = useState(0);

  const categories = useMemo(
    () =>
      createListCollection({
        items: data ?? [],
        itemToValue: (item) => item.id,
        itemToString: (item) => item.name,
      }),
    [data],
  );

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
    const business = await createBusiness(businessData);
    if (business) {
      refresh();
      push(`/dashboard/business/${business.id}`);
    }
  });

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
                  <Input {...register("name")} />
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

                <Field.Root required invalid={!!errors.categoryId}>
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
                        onValueChange={({ value }) => {
                          field.onChange(value);
                          field.onBlur();
                        }}
                        onInteractOutside={() => field.onBlur()}
                        collection={categories}
                      >
                        <Select.HiddenSelect />
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText placeholder={"Select category"} />
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
                              {categories.items.map((category) => (
                                <Select.Item item={category} key={category.id}>
                                  {category.name}
                                  <Select.ItemIndicator />
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select.Positioner>
                        </Portal>
                      </Select.Root>
                    )}
                  />
                  <Field.ErrorText>
                    {errors.categoryId?.message}
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
                  <Field.ErrorText>{errors.slug?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root required invalid={!!errors.address}>
                  <Field.Label>
                    Address <Field.RequiredIndicator />
                  </Field.Label>
                  <Input {...register("address")} />
                  <Field.ErrorText>{errors.address?.message}</Field.ErrorText>
                </Field.Root>

                <Field.Root required invalid={!!errors.phone}>
                  <Field.Label>
                    Phone <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    placeholder="+(234)-999-999-9999"
                    {...withMask("phone", "+(234)-999-999-9999")}
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
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
            >
              Submit
            </Button>
          ) : (
            <Button disabled={isSubmitting}>Next</Button>
          )}
        </Steps.NextTrigger>
      </ButtonGroup>
    </Steps.Root>
  );
};
