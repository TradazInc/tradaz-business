"use client";

import { toaster } from "@/components/ui/toaster";
import { useBusinessCategories } from "@/hooks/businessCategory";
import {
  BusinessData,
  businessInfoSchema,
  contactInfoSchema,
} from "@/schema/business";
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
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

export const BusinessForm = () => {
  const { data, error } = useBusinessCategories();
  const [isSubmitting, startSubmission] = useTransition();
  const router = useRouter();

  const [step, setStep] = useState<number>(1);
  const [businessData, setBusinessData] = useState<BusinessData>({
    name: "",
    categoryId: "",
    slug: "",
    address: "",
    phone: "",
  });

  const categories = useMemo(
    () =>
      createListCollection({
        items: data ?? [],
        itemToValue: (item) => item.id,
        itemToString: (item) => item.name,
      }),
    [data],
  );

  const handleChange = (field: keyof BusinessData, value: string) =>
    setBusinessData((prev) => ({ ...prev, [field]: value }));

  const handleBusinessSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = businessInfoSchema.safeParse(businessData);
    if (!result.success) {
      toaster.create({
        description: result.error.issues[0].message,
        type: "error",
      });
      return;
    }
    setStep((s) => s + 1);
  };

  const handleContactSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = contactInfoSchema.safeParse(businessData);
    if (!result.success) {
      toaster.create({
        description: result.error.issues[0].message,
        type: "error",
      });
      return;
    }

    startSubmission(async () => {
      const business = await createBusiness(businessData);
      if (business) {
        router.refresh();
        router.push(`/dashboard/business/${business.id}`);
      }
    });
  };

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
        <form onSubmit={handleBusinessSubmit} style={{ width: "100%" }}>
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
              <Field.Root required>
                <Field.Label>
                  Name <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  name="name"
                  value={businessData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
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

              <Field.Root required>
                <Select.Root
                  required
                  size={"sm"}
                  name={"categoryId"}
                  collection={categories}
                  value={
                    businessData.categoryId ? [businessData.categoryId] : []
                  }
                  onValueChange={(e) =>
                    handleChange("categoryId", e.value[0] ?? "")
                  }
                >
                  <Select.HiddenSelect />
                  <Select.Label>
                    Select category <Field.RequiredIndicator />
                  </Select.Label>
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder={"Select category"} />
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
              </Field.Root>
            </Fieldset.Content>

            <Button type={"submit"} alignSelf={"flex-start"}>
              Continue
            </Button>
          </Fieldset.Root>
        </form>
      ) : (
        <form onSubmit={handleContactSubmit} style={{ width: "100%" }}>
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
              <Field.Root required>
                <Field.Label>
                  Slug <Field.RequiredIndicator />
                </Field.Label>
                <InputGroup startAddon="www." endAddon=".com">
                  <Input
                    name="slug"
                    placeholder="yoursite"
                    value={businessData.slug}
                    onChange={(e) => handleChange("slug", e.target.value)}
                  />
                </InputGroup>
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  Address <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  name="address"
                  value={businessData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </Field.Root>

              <Field.Root required>
                <Field.Label>
                  Phone <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  name="phone"
                  placeholder="+234-XXX-XXXX-XXX"
                  value={businessData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
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
