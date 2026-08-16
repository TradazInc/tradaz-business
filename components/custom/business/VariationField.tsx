import { emptyVariation } from "@/data/productForm";
import { ProductData, ProductFormValues } from "@/schema/product";
import { SizeType } from "@/server/entities/sizeType";
import {
  Box,
  Button,
  ColorPicker,
  createListCollection,
  Field,
  Fieldset,
  GridItem,
  HStack,
  IconButton,
  NumberInput,
  parseColor,
  Portal,
  Select,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useMemo } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import TeamVariationField from "./TeamVariationField";

interface Props {
  control: Control<ProductFormValues, unknown, ProductData>;
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  sizeTypes: SizeType[];
  isLoading: boolean;
}

const VariationField = ({
  control,
  errors,
  register,
  sizeTypes,
  isLoading,
}: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variations",
  });

  // Recompute size collection when size type changes
  const [selectedSizeTypeId] = useWatch({ control, name: "sizeTypeId" });
  const sizeCollection = useMemo(
    () =>
      createListCollection({
        items:
          sizeTypes.find((sizeType) => sizeType.id === selectedSizeTypeId)
            ?.sizes ?? [],
        itemToValue: (item) => item.id,
        itemToString: (item) => item.value,
      }),
    [sizeTypes, selectedSizeTypeId],
  );

  return (
    <Fieldset.Root invalid={!!errors.variations?.root?.message}>
      <Fieldset.Legend>Variations</Fieldset.Legend>
      {fields.map((variation, index) => (
        <Fieldset.Content
          p={4}
          bg={"bg.panel"}
          key={variation.id}
          borderRadius={"md"}
        >
          <HStack justify="space-between" mb={4}>
            <Text fontWeight="medium">Variation {index + 1}</Text>
            <IconButton
              size="sm"
              type="button"
              variant="subtle"
              onClick={() => remove(index)}
            >
              <LuTrash2 />
            </IconButton>
          </HStack>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            <Field.Root required invalid={!!errors.variations?.[index]?.color}>
              <Field.Label>
                Color <Field.RequiredIndicator />
              </Field.Label>
              <Controller
                name={`variations.${index}.color`}
                control={control}
                render={({ field }) => (
                  <ColorPicker.Root
                    w={"full"}
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

            <Field.Root required invalid={!!errors.variations?.[index]?.sizeId}>
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
                    disabled={!selectedSizeTypeId}
                    onValueChange={({ value }) => {
                      field.onChange(value);
                      field.onBlur();
                    }}
                    onInteractOutside={() => field.onBlur()}
                    collection={sizeCollection}
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder={"Select size"} />
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
                          {sizeCollection.size > 0 ? (
                            sizeCollection.items.map((size) => (
                              <Select.Item item={size} key={size.id}>
                                {size.value}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))
                          ) : (
                            <Box>No sizes found</Box>
                          )}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                )}
              />
              <Field.HelperText>
                {!selectedSizeTypeId && "Select a size type first"}
              </Field.HelperText>
              <Field.ErrorText>
                {errors.variations?.[index]?.sizeId?.message}
              </Field.ErrorText>
            </Field.Root>

            <GridItem colSpan={{ base: 1, md: 2 }}>
              <Field.Root
                required
                invalid={!!errors.variations?.[index]?.price}
              >
                <Field.Label>
                  Price <Field.RequiredIndicator />
                </Field.Label>
                <Controller
                  control={control}
                  name={`variations.${index}.price`}
                  render={({ field }) => (
                    <NumberInput.Root
                      min={0}
                      step={0.01}
                      w={"full"}
                      name={field.name}
                      disabled={field.disabled}
                      formatOptions={{
                        style: "currency",
                        currency: "NGN",
                        currencyDisplay: "symbol",
                        currencySign: "accounting",
                        maximumFractionDigits: 2,
                      }}
                      value={
                        Number.isNaN(field.value) ? "" : field.value.toString()
                      }
                      onValueChange={({ valueAsNumber }) =>
                        field.onChange(valueAsNumber)
                      }
                    >
                      <NumberInput.Control />
                      <NumberInput.Input onBlur={field.onBlur} />
                    </NumberInput.Root>
                  )}
                />
                <Field.ErrorText>
                  {errors.variations?.[index]?.price?.message}
                </Field.ErrorText>
              </Field.Root>
            </GridItem>

            <TeamVariationField
              control={control}
              errors={errors}
              variationIndex={index}
            />
          </SimpleGrid>
        </Fieldset.Content>
      ))}

      <Button
        size={"sm"}
        type="button"
        variant="subtle"
        alignSelf="flex-start"
        onClick={() => append(emptyVariation)}
      >
        <LuPlus /> Add variation
      </Button>

      <Fieldset.ErrorText>
        {errors.variations?.root?.message}
      </Fieldset.ErrorText>
    </Fieldset.Root>
  );
};

export default VariationField;
