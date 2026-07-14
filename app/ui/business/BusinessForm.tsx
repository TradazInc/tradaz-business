"use client";

import { useBusinessCategories } from "@/hooks/businessCategory";
import { businessSchema } from "@/schema/business";
import { createBusiness } from "@/services/business";
import {
  Box,
  Button,
  createListCollection,
  Field,
  Fieldset,
  FileUpload,
  Input,
  InputGroup,
  Portal,
  Select,
  Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export const BusinessForm = () => {
  const { data, error } = useBusinessCategories();
  const [step, setStep] = useState<number>(1);
  const { refresh, push } = useRouter();

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
    <Box
      key={step}
      w={"full"}
      animationName={"fade-in"}
      animationDuration={"moderate"}
      animationTimingFunction={"ease-out"}
    >
      {step <= 1 ? (
        <form onSubmit={() => setStep((s) => s + 1)} style={{ width: "100%" }}>
          <Fieldset.Root
            size="lg"
            w="full"
            maxW={{ base: "full", md: "2xl", xl: "4xl" }}
            mx="auto"
            px={{ base: 4, md: 0 }}
          >
            <Stack>
              <Fieldset.Legend>Business information</Fieldset.Legend>
              <Fieldset.HelperText>
                Tell us about your business. Step 1 of 2.
              </Fieldset.HelperText>
            </Stack>

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
                    Select category <Field.RequiredIndicator />
                  </Select.Label>
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText
                        placeholder={"Select business category"}
                      />
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

            <Button type={"submit"} alignSelf={"flex-start"}>
              Continue
            </Button>
          </Fieldset.Root>
        </form>
      ) : (
        <form onSubmit={onSubmit} style={{ width: "100%" }}>
          <Fieldset.Root
            size="lg"
            w="full"
            maxW={{ base: "full", md: "2xl", xl: "4xl" }}
            mx="auto"
            px={{ base: 4, md: 0 }}
          >
            <Stack>
              <Fieldset.Legend>Contact information</Fieldset.Legend>
              <Fieldset.HelperText>
                How can customers reach you? Step 2 of 2.
              </Fieldset.HelperText>
            </Stack>

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

            <Stack direction="row" alignSelf="flex-start">
              <Button
                type={"button"}
                variant={"outline"}
                onClick={() => setStep((s) => s - 1)}
                disabled={isSubmitting}
              >
                Back
              </Button>
              <Button
                type={"submit"}
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Submit
              </Button>
            </Stack>
          </Fieldset.Root>
        </form>
      )}
    </Box>
  );
};
