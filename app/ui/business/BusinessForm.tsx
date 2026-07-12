"use client";

import { useBusinessCategories } from "@/hooks/businessCategory";
import { createBusiness } from "@/services/business";
import {
  Box,
  Button,
  createListCollection,
  Field,
  Fieldset,
  FileUpload,
  For,
  Input,
  InputGroup,
  NativeSelect,
  Portal,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const BusinessForm = () => {
  const { data, error } = useBusinessCategories();
  const [isSubmitting, startSubmission] = useTransition();
  const router = useRouter();

  const categories = createListCollection({ items: data ?? [] });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startSubmission(async () => {
      const business = await createBusiness(formData);
      if (business) {
        router.refresh();
        router.push(`/dashboard/business/${business.id}`);
      }
    });
  };

  if (error) return null;

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Fieldset.Root
        size="lg"
        w="full"
        maxW={{ base: "full", md: "2xl", xl: "4xl" }}
        mx="auto"
        px={{ base: 4, md: 0 }}
      >
        <Stack>
          <Fieldset.Legend>Business details</Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide your business details below.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root required>
            <Field.Label>
              Name <Field.RequiredIndicator />
            </Field.Label>
            <Input name="name" />
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              Slug <Field.RequiredIndicator />
            </Field.Label>
            <InputGroup startAddon="www." endAddon=".com">
              <Input name="slug" placeholder="yoursite" />
            </InputGroup>
          </Field.Root>

          <Field.Root>
            <Field.Label>
              Phone <Field.RequiredIndicator />
            </Field.Label>
            <Input name="phone" placeholder="+234-XXX-XXXX-XXX" />
          </Field.Root>

          <Field.Root>
            <Field.Label>
              Address <Field.RequiredIndicator />
            </Field.Label>
            <Input name="address" />
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

          <Field.Root>
            <Select.Root
              size={"sm"}
              name={"categoryId"}
              collection={categories}
            >
              <Select.HiddenSelect />
              <Select.Label>
                Select category <Field.RequiredIndicator />
              </Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select category" />
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

        <Button
          type={"submit"}
          alignSelf={"flex-start"}
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          Submit
        </Button>
      </Fieldset.Root>
    </form>
  );
};
