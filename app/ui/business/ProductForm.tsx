"use client";

import { toaster } from "@/components/ui/toaster";
import { Product } from "@/entities/Product";
import { useProductCategories } from "@/hooks/productCategory";
import { useSizeTypes } from "@/hooks/sizeType";
import { productSchema } from "@/schema/product";
import { createProduct } from "@/services/product";
import { parsePagedData } from "@/utilities/parsePagedData";
import {
  Box,
  Button,
  ColorPicker,
  createListCollection,
  Field,
  Fieldset,
  FileUpload,
  HStack,
  Icon,
  IconButton,
  Input,
  parseColor,
  Portal,
  Select,
  Spinner,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useRouter } from "next/navigation";
import { useId, useMemo } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { LuPlus, LuTrash2, LuUpload } from "react-icons/lu";
import InfiniteScroll from "react-infinite-scroll-component";
import TeamVariationsField from "./TeamVariationsField";
import { emptyProduct, emptyVariation } from "@/data/productForm";
import TotalQuantity from "./TotalQuantity";
import { formProduct } from "@/utilities/formProduct";

interface Props {
  product?: Product;
}

const ProductForm = ({ product }: Props) => {
  // Fetch data
  const categories = useProductCategories();
  const sizeTypes = useSizeTypes();
  const { refresh, push } = useRouter();
  const categoryScrollId = useId();
  const sizetypeScrollId = useId();

  // Parse paged data
  const parsedCategories = useMemo(
    () => parsePagedData(categories.data),
    [categories.data],
  );
  const parsedSizeTypes = useMemo(
    () => parsePagedData(sizeTypes.data),
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

  // Initialize hook form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: standardSchemaResolver(productSchema),
    defaultValues: product ? formProduct(product) : emptyProduct,
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variations",
  });

  const onSubmit = handleSubmit(async (productData) => {
    const product = await createProduct(productData);
    if (product) {
      refresh();
      push(`/dashboard/business/products/${product.id}`);
    }
  });

  // Handle errors
  if (categories.error)
    toaster.create({
      title: categories.error.code,
      description: categories.error.message,
      type: "error",
    });

  if (sizeTypes.error)
    toaster.create({
      title: sizeTypes.error.code,
      description: sizeTypes.error.message,
      type: "error",
    });

  return (
    <form style={{ width: "100%" }} onSubmit={onSubmit}>
      <Fieldset.Root
        w="full"
        size="lg"
        mx="auto"
        px={{ base: 4, md: 0 }}
        maxW={{ base: "full", md: "2xl", xl: "4xl" }}
      >
        <Fieldset.Legend>Product details</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your product details below.
        </Fieldset.HelperText>
        <Fieldset.Content>
          <FileUpload.Root
            alignItems="stretch"
            maxFiles={10}
            accept={["image/png"]}
          >
            <FileUpload.HiddenInput />
            <FileUpload.Dropzone>
              <Icon size="md" color="fg.muted">
                <LuUpload />
              </Icon>
              <FileUpload.DropzoneContent>
                <Box>Drag and drop files here</Box>
                <Box color="fg.muted">.png, .jpg up to 5MB</Box>
              </FileUpload.DropzoneContent>
            </FileUpload.Dropzone>
            <FileUpload.List />
          </FileUpload.Root>

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
                          {categoryCollection.items.map((category) => (
                            <Select.Item item={category} key={category.id}>
                              {category.name}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
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
                          {sizeTypeCollection.items.map((sizeType) => (
                            <Select.Item item={sizeType} key={sizeType.id}>
                              {sizeType.name}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </InfiniteScroll>
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              )}
            />
            <Field.ErrorText>{errors.sizeTypeId?.message}</Field.ErrorText>
          </Field.Root>

          <Fieldset.Root invalid={!!errors.variations?.root?.message}>
            <Fieldset.Legend>Variations</Fieldset.Legend>
            {fields.map((variation, index) => (
              <Fieldset.Content
                key={variation.id}
                borderWidth="1px"
                borderRadius="md"
                p={4}
              >
                <HStack justify="space-between" mb={4}>
                  <Text fontWeight="medium">Variation {index + 1}</Text>
                  <IconButton
                    size="sm"
                    type="button"
                    variant="subtle"
                    colorPalette={"fg.error"}
                    onClick={() => remove(index)}
                  >
                    <LuTrash2 />
                  </IconButton>
                </HStack>

                <Stack gap={4}>
                  <Field.Root
                    required
                    invalid={!!errors.variations?.[index]?.sku}
                  >
                    <Field.Label>
                      SKU <Field.RequiredIndicator />
                    </Field.Label>
                    <Input {...register(`variations.${index}.sku`)} />
                    <Field.ErrorText>
                      {errors.variations?.[index]?.sku?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  <Field.Root
                    required
                    invalid={!!errors.variations?.[index]?.color}
                  >
                    <Field.Label>
                      Color <Field.RequiredIndicator />
                    </Field.Label>
                    <Controller
                      name={`variations.${index}.color`}
                      control={control}
                      render={({ field }) => (
                        <ColorPicker.Root
                          name={field.name}
                          value={parseColor(field.value)}
                          onValueChange={({ value }) =>
                            field.onChange(value.toString("hex"))
                          }
                          onInteractOutside={() => field.onBlur()}
                        >
                          <ColorPicker.HiddenInput />
                          <ColorPicker.Control>
                            <ColorPicker.Input />
                            <ColorPicker.Trigger />
                          </ColorPicker.Control>
                          <Portal>
                            <ColorPicker.Positioner>
                              <ColorPicker.Content>
                                <ColorPicker.Area />
                                <HStack>
                                  <ColorPicker.EyeDropper
                                    size="sm"
                                    variant="outline"
                                  />
                                  <ColorPicker.Sliders />
                                </HStack>
                              </ColorPicker.Content>
                            </ColorPicker.Positioner>
                          </Portal>
                        </ColorPicker.Root>
                      )}
                    />
                    <Field.ErrorText>
                      {errors.variations?.[index]?.color?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  <Field.Root
                    required
                    invalid={!!errors.variations?.[index]?.price}
                  >
                    <Field.Label>
                      Price <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      type="number"
                      step="0.01"
                      {...register(`variations.${index}.price`, {
                        valueAsNumber: true,
                      })}
                    />
                    <Field.ErrorText>
                      {errors.variations?.[index]?.price?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  {/* TODO(step 5): dependent select on the chosen sizeTypeId (using sizeTypeId for now) */}
                  <Field.Root
                    required
                    invalid={!!errors.variations?.[index]?.sizeId}
                  >
                    <Field.Label>
                      Size <Field.RequiredIndicator />
                    </Field.Label>
                    <Controller
                      control={control}
                      name={`variations.${index}.sizeId`}
                      render={({ field }) => (
                        <Select.Root
                          name={field.name}
                          value={field.value}
                          onValueChange={({ value }) => {
                            field.onChange(value);
                            field.onBlur();
                          }}
                          onInteractOutside={() => field.onBlur()}
                          collection={sizeTypeCollection}
                        >
                          <Select.HiddenSelect />
                          <Select.Control>
                            <Select.Trigger>
                              <Select.ValueText placeholder={"Select size"} />
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
                              <Select.Content>
                                {sizeTypeCollection.items.map((sizeType) => (
                                  <Select.Item
                                    item={sizeType}
                                    key={sizeType.id}
                                  >
                                    {sizeType.name}
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
                      {errors.variations?.[index]?.sizeId?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  <TeamVariationsField
                    control={control}
                    register={register}
                    errors={errors}
                    variationIndex={index}
                  />
                </Stack>
              </Fieldset.Content>
            ))}

            <Button
              type="button"
              variant="outline"
              alignSelf="flex-start"
              onClick={() => append(emptyVariation)}
            >
              <LuPlus /> Add variation
            </Button>

            <Fieldset.ErrorText>
              {errors.variations?.root?.message}
            </Fieldset.ErrorText>
          </Fieldset.Root>
        </Fieldset.Content>

        <TotalQuantity control={control} />

        <Button
          type="submit"
          alignSelf="flex-start"
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
        >
          {product ? "Update Product" : "Create New Product"}
        </Button>
      </Fieldset.Root>
    </form>
  );
};

export default ProductForm;
