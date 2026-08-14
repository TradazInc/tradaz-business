"use client";

import { toaster } from "@/components/ui/toaster";
import { emptyProduct } from "@/data/productForm";
import { productSchema } from "@/schema/product";
import { Gender, Product } from "@/server/entities/product";
import { useAddProduct } from "@/server/hooks/product";
import { useProductCategories } from "@/server/hooks/productCategory";
import { useSizeTypes } from "@/server/hooks/sizeType";
import { errorOptions } from "@/utilities/errorToastOptions";
import { formProduct } from "@/utilities/formProduct";
import { parseCursorData } from "@/utilities/parsePagedData";
import {
  Box,
  Button,
  createListCollection,
  Field,
  Fieldset,
  Input,
  Portal,
  Select,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useRouter } from "next/navigation";
import { useId, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import InfiniteScroll from "react-infinite-scroll-component";
import TotalQuantity from "./TotalQuantity";
import VariationField from "./VariationField";
import ImageUpload from "../shared/ImageUpload";

interface Props {
  product?: Product;
}

const ProductForm = ({ product }: Props) => {
  const { trigger, isMutating } = useAddProduct();
  const categories = useProductCategories();
  const sizeTypes = useSizeTypes();
  const { refresh, push } = useRouter();
  const categoryScrollId = useId();
  const sizetypeScrollId = useId();

  // Parse paged data
  const parsedCategories = useMemo(
    () => parseCursorData(categories.data),
    [categories.data],
  );
  const parsedSizeTypes = useMemo(
    () => parseCursorData(sizeTypes.data),
    [sizeTypes.data],
  );

  // Create collection data (chakra)
  const categoryCollection = useMemo(
    () =>
      createListCollection({
        items: parsedCategories.flatData,
        itemToValue: (item) => item?.id,
        itemToString: (item) => item.name,
      }),
    [parsedCategories.flatData],
  );
  const sizeTypeCollection = useMemo(
    () =>
      createListCollection({
        items: parsedSizeTypes.flatData,
        itemToValue: (item) => item?.id,
        itemToString: (item) => item.name,
      }),
    [parsedSizeTypes.flatData],
  );

  const genderCollection = createListCollection({
    items: [
      { label: "Male", value: Gender.male },
      { label: "Female", value: Gender.female },
      { label: "Unisex", value: Gender.unisex },
    ],
  });

  // Initialize hook form
  const {
    control,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: standardSchemaResolver(productSchema),
    defaultValues: product ? formProduct(product) : emptyProduct,
    mode: "onBlur",
  });

  // Clear sizes when size type changes
  const clearVariationSizes = () =>
    getValues("variations").forEach((_, index) =>
      setValue(`variations.${index}.sizeId`, [], { shouldValidate: true }),
    );

  const onSubmit = handleSubmit(async (productData) => {
    const promise = toaster.promise(trigger(productData), {
      loading: { title: "Creating product...", description: "Please wait" },
      success: (product) => ({
        title: "Creation successful",
        description: `${product.name} product has been created`,
      }),
      error: errorOptions,
    });
    if (!promise) return;
    try {
      const product = await promise.unwrap();
      refresh();
      push(`/dashboard/business/products/${product.id}`);
    } catch {} // Error displayed by toaster
  });

  return (
    <form style={{ width: "100%" }} onSubmit={onSubmit}>
      <Fieldset.Root
        px={4}
        w={"full"}
        size={"lg"}
        mx={"auto"}
        maxW={{ base: "full", md: "2xl", xl: "4xl" }}
      >
        <Fieldset.Legend>Product details</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your product details below.
        </Fieldset.HelperText>
        <Fieldset.Content>
          <Controller
            control={control}
            name={"images"}
            render={({ field, fieldState }) => (
              <Field.Root required invalid={!!fieldState.error}>
                <Field.Label>
                  Images <Field.RequiredIndicator />
                </Field.Label>
                <ImageUpload
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  invalid={!!fieldState.error}
                />
                <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
              </Field.Root>
            )}
          />

          <Field.Root required invalid={!!errors.name}>
            <Field.Label>
              Name <Field.RequiredIndicator />
            </Field.Label>
            <Input {...register("name")} />
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={!!errors.brand}>
            <Field.Label>
              Brand <Field.RequiredIndicator />
            </Field.Label>
            <Input {...register("brand")} />
            <Field.ErrorText>{errors.brand?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.description}>
            <Field.Label>Description</Field.Label>
            <Textarea autoresize {...register("description")} />
            <Field.HelperText>
              A short description of the product
            </Field.HelperText>
            <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={!!errors.gender}>
            <Field.Label>
              Gender <Field.RequiredIndicator />
            </Field.Label>
            <Controller
              control={control}
              name={"gender"}
              render={({ field }) => (
                <Select.Root
                  name={field.name}
                  value={[field.value]}
                  onValueChange={({ value }) => {
                    field.onChange(value[0]);
                    field.onBlur();
                  }}
                  onInteractOutside={() => field.onBlur()}
                  collection={genderCollection}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder={"Select gender"} />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {genderCollection.items.map((gender) => (
                          <Select.Item item={gender} key={gender.value}>
                            {gender.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              )}
            />
            <Field.ErrorText>{errors.gender?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={!!errors.discountPercentage}>
            <Field.Label>
              Discount %<Field.RequiredIndicator />
            </Field.Label>
            <Input
              type="number"
              step="1"
              {...register("discountPercentage", {
                valueAsNumber: true,
              })}
            />
            <Field.ErrorText>
              {errors.discountPercentage?.message}
            </Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={!!errors.categoryId}>
            <Field.Label>
              Product category <Field.RequiredIndicator />
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
                  collection={categoryCollection}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder={"Select category"} />
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
                  <Portal>
                    <Select.Positioner>
                      <Select.Content id={categoryScrollId}>
                        <InfiniteScroll
                          dataLength={parsedCategories.flatData.length}
                          hasMore={parsedCategories.hasMore}
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
                            <Box>No product categories found</Box>
                          )}
                        </InfiniteScroll>
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              )}
            />
            <Field.ErrorText>{errors.categoryId?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={!!errors.sizeTypeId}>
            <Field.Label>
              Product size type <Field.RequiredIndicator />
            </Field.Label>
            <Controller
              control={control}
              name={"sizeTypeId"}
              render={({ field }) => (
                <Select.Root
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => {
                    field.onChange(value);
                    field.onBlur();
                    clearVariationSizes();
                  }}
                  onInteractOutside={() => field.onBlur()}
                  collection={sizeTypeCollection}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder={"Select size type"} />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.ClearTrigger />
                      {sizeTypes.isLoading ? (
                        <Spinner size="sm" />
                      ) : (
                        <Select.Indicator />
                      )}
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content id={sizetypeScrollId}>
                        <InfiniteScroll
                          dataLength={parsedSizeTypes.flatData.length}
                          hasMore={parsedSizeTypes.hasMore}
                          next={() => sizeTypes.setSize(sizeTypes.size + 1)}
                          loader={<Spinner size={"xs"} />}
                          scrollableTarget={sizetypeScrollId}
                        >
                          {sizeTypeCollection.size > 0 ? (
                            sizeTypeCollection.items.map((sizeType) => (
                              <Select.Item item={sizeType} key={sizeType.id}>
                                {sizeType.name}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))
                          ) : (
                            <Box>No size types found</Box>
                          )}
                        </InfiniteScroll>
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              )}
            />
            <Field.ErrorText>{errors.sizeTypeId?.message}</Field.ErrorText>
          </Field.Root>

          <VariationField
            control={control}
            errors={errors}
            register={register}
            isLoading={sizeTypes.isLoading}
            sizeTypes={parsedSizeTypes.flatData}
          />
        </Fieldset.Content>

        <TotalQuantity control={control} />

        <Button
          type="submit"
          alignSelf="flex-start"
          disabled={!isValid || isSubmitting || isMutating}
          loading={isSubmitting || isMutating}
        >
          {product ? "Update Product" : "Create Product"}
        </Button>

        <Fieldset.ErrorText>
          Some fields are invalid. Please check them.
        </Fieldset.ErrorText>
      </Fieldset.Root>
    </form>
  );
};

export default ProductForm;
