"use client";

import { useBusinessCategories } from "@/hooks/businessCategory";
import { CreateBusinessInputData } from "@/schema/business";
import { parseCursorData } from "@/utilities/parsePageData";
import {
  Box,
  Button,
  CloseButton,
  createListCollection,
  Field,
  Fieldset,
  FileUpload,
  Input,
  InputGroup,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { useId, useMemo } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { LuFileUp } from "react-icons/lu";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  form: UseFormReturn<CreateBusinessInputData>;
}

const BrandStep = ({
  form: {
    register,
    control,
    formState: { errors },
  },
}: Props) => {
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
    <Fieldset.Root>
      <Field.Root required invalid={!!errors.name}>
        <Field.Label>
          Name <Field.RequiredIndicator />
        </Field.Label>
        <Input placeholder="e.g., Tradaz" {...register("name")} />
        <Field.HelperText>Name of business</Field.HelperText>
        <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
      </Field.Root>

      <Field.Root>
        <FileUpload.Root disabled gap={1.5} maxFiles={1} accept={["image/png"]}>
          <FileUpload.HiddenInput />
          <FileUpload.Label>Brand logo</FileUpload.Label>
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
        <Field.HelperText>Enabled after subscription</Field.HelperText>
      </Field.Root>

      <Field.Root required invalid={!!(errors.categoryId || categories.error)}>
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
    </Fieldset.Root>
  );
};

export default BrandStep;
