"use client";

import { useBusinessCategories } from "@/hooks/businessCategory";
import { businessSchema } from "@/schema/business";
import { createBusiness } from "@/services/business";
import {
  Box,
  Button,
  ButtonGroup,
  createListCollection,
  Field,
  Fieldset,
  FileUpload,
  Input,
  InputGroup,
  Portal,
  Select,
  Steps,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export const BusinessForm = () => {
  const { data, error } = useBusinessCategories();
  const { refresh, push } = useRouter();
  const [step, setStep] = useState(1);

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
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(businessSchema), mode: "onBlur" });

  const onSubmit = handleSubmit(async (businessData) => {
    const business = await createBusiness(businessData);
    if (business) {
      refresh();
      push(`/dashboard/business/${business.id}`);
    }
  });

  if (error) return null;

  return (
    <Steps.Root
      size={"sm"}
      step={step}
      onStepChange={(e) => setStep(e.step + 1)} // e.step starts from 0
      count={steps.length}
      animationName={"fade-in"}
      animationDuration={"moderate"}
      animationTimingFunction={"ease-out"}
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
          maxW={{ base: "full", md: "2xl", xl: "4xl" }}
          px={{ base: 4, md: 0 }}
        >
          {step === 1 && (
            <Fieldset.Content>
              <Field.Root required invalid={!!errors.name}>
                <Field.Label>
                  Name <Field.RequiredIndicator />
                </Field.Label>
                <Input {...register("name")} />
                <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
              </Field.Root>

              <FileUpload.Root gap="1" maxFiles={1} accept={["image/png"]}>
                <FileUpload.HiddenInput />
                <FileUpload.Label>Upload logo</FileUpload.Label>
                <Input asChild>
                  <FileUpload.Trigger>
                    <FileUpload.FileText />
                  </FileUpload.Trigger>
                </Input>
              </FileUpload.Root>

              <Field.Root required invalid={!!errors.categoryId}>
                <Select.Root
                  required
                  size={"sm"}
                  collection={categories}
                  {...register("categoryId")}
                >
                  <Select.HiddenSelect />
                  <Select.Label>
                    Brand category <Field.RequiredIndicator />
                  </Select.Label>
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder={"Select brand category"} />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
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
                <Field.ErrorText>{errors.categoryId?.message}</Field.ErrorText>
              </Field.Root>
            </Fieldset.Content>
          )}
          {step === 2 && (
            <Fieldset.Content>
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
                <Input placeholder="+234-XXX-XXXX-XXX" {...register("phone")} />
                <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
              </Field.Root>
            </Fieldset.Content>
          )}
        </Fieldset.Root>
      </form>
      <Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>

      <ButtonGroup size="sm" variant="outline">
        <Steps.PrevTrigger asChild>
          <Button variant={"outline"} disabled={isSubmitting}>
            Prev
          </Button>
        </Steps.PrevTrigger>
        <Steps.NextTrigger asChild>
          {step === steps.length ? (
            <Button
              form={"business-form"}
              type={"submit"}
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              Submit
            </Button>
          ) : (
            <Button variant={"outline"} disabled={isSubmitting}>
              Next
            </Button>
          )}
        </Steps.NextTrigger>
      </ButtonGroup>
    </Steps.Root>
  );
};

const steps = [
  {
    title: "Brand information",
    description: "Tell us about your brand.",
  },
  {
    title: "Contact information",
    description: "How can customers reach you?",
  },
];
