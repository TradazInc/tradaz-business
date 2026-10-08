"use client";

import { toaster } from "@/components/ui/toaster";
import { useAddBusiness } from "@/hooks/business";
import {
  CreateBusinessInputData,
  CreateBusinessInputSchema,
} from "@/schema/business";
import { computePath } from "@/utilities/computePath";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import {
  Box,
  Button,
  ButtonGroup,
  createOverlay,
  Dialog,
  Portal,
  Steps,
  Text,
  useSteps,
} from "@chakra-ui/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { FieldPath, useForm, UseFormReturn } from "react-hook-form";
import { LuCheck, LuPlus } from "react-icons/lu";
import { MdOutlineBusiness } from "react-icons/md";
import { TiContacts } from "react-icons/ti";
import { z } from "zod";
import FormButton from "./FormButton";
import BrandStep from "./BrandStep";
import ContactStep from "./ContactStep";

interface BusinessFormProps {
  signup?: string;
}

export const businessDialog = createOverlay((props) => {
  const { trigger, isMutating } = useAddBusiness();
  const { refresh, push } = useRouter();

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
      props.onOpenChange?.({ open: false });
    } catch {} // Error displayed by toaster
  });

  return (
    <Dialog.Root {...props} size={"lg"} lazyMount>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Body>
              <Steps.RootProvider value={steps} size={"sm"}>
                <Steps.List mt={4}>
                  {stepsData.map((step, index) => (
                    <Steps.Item key={index} index={index}>
                      <Steps.Trigger>
                        <Steps.Indicator>
                          <Steps.Status
                            incomplete={step.icon}
                            complete={<LuCheck />}
                          />
                        </Steps.Indicator>
                        <Box>
                          <Steps.Title>{step.title}</Steps.Title>
                          <Steps.Description>
                            {step.description}
                          </Steps.Description>
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
                  {isLastStep ? (
                    <Button
                      onClick={onSubmit}
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
                    <Steps.NextTrigger asChild>
                      <Button>Next</Button>
                    </Steps.NextTrigger>
                  )}
                </ButtonGroup>
              </Steps.RootProvider>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});

export const BusinessForm = ({ signup }: BusinessFormProps) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Open form dialog on signup
  useEffect(() => {
    if (!signup) return;
    businessDialog.open("business-form", {});

    const params = new URLSearchParams(searchParams.toString());
    params.delete("signup");
    replace(`${pathname}?${params.toString()}`);
  }, [signup, pathname, searchParams, replace]);

  return (
    <FormButton
      onClick={() => {
        businessDialog.open("business-form", {});
      }}
    >
      <LuPlus />
      New Brand
    </FormButton>
  );
};

export const BusinessFormViewport = businessDialog.Viewport;

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
    render: (form) => <BrandStep form={form} />,
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
    render: (form) => <ContactStep form={form} />,
  },
];
