"use client";

import { useBusinessCategories } from "@/hooks/businessCategory";
import {
  Button,
  Field,
  Fieldset,
  FileUpload,
  For,
  Input,
  NativeSelect,
  Stack,
} from "@chakra-ui/react";

export const BusinessForm = () => {
  const { data: categories, error, isLoading } = useBusinessCategories();

  if (error) return null;

  return (
    <Fieldset.Root size="lg" maxW="lg">
      <Stack>
        <Fieldset.Legend>Business details</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your business details below.
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content>
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Input name="name" />
        </Field.Root>

        <Field.Root>
          <Field.Label>Slug</Field.Label>
          <Input name="slug" />
        </Field.Root>

        <Field.Root>
          <Field.Label>Description</Field.Label>
          <Input name="description" />
        </Field.Root>

        <Field.Root>
          <Field.Label>Phone</Field.Label>
          <Input name="phone" />
        </Field.Root>

        <Field.Root>
          <Field.Label>Address</Field.Label>
          <Input name="address" />
        </Field.Root>

        <FileUpload.Root
          gap="1"
          maxFiles={1}
          accept={["image/png"]}
        >
          <FileUpload.HiddenInput />
          <FileUpload.Label>Upload logo</FileUpload.Label>
          <Input asChild>
            <FileUpload.Trigger>
              <FileUpload.FileText />
            </FileUpload.Trigger>
          </Input>
        </FileUpload.Root>

        <Field.Root>
          <Field.Label>Category</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field name="category">
              <For each={categories}>
                {(category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                )}
              </For>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>
      </Fieldset.Content>

      <Button type="submit" alignSelf="flex-start">
        Submit
      </Button>
    </Fieldset.Root>
  );
};
