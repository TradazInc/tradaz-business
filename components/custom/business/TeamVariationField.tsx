"use client";

import { emptyTeamVariation } from "@/data/productForm";
import { ProductData, ProductFormValues } from "@/schema/product";
import { useStores } from "@/server/hooks/store";
import {
  Button,
  createListCollection,
  Field,
  Fieldset,
  IconButton,
  NumberInput,
  Portal,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
} from "react-hook-form";
import { LuPlus, LuTrash2 } from "react-icons/lu";

interface Props {
  control: Control<ProductFormValues, unknown, ProductData>;
  errors: FieldErrors<ProductFormValues>;
  variationIndex: number;
}

const TeamVariationField = ({ control, errors, variationIndex }: Props) => {
  // Fetch data
  const { businessId } = useParams<{ businessId?: string }>();
  const { data, isLoading, error, mutate } = useStores(businessId);

  // Create collection data (chakra)
  const storeCollection = useMemo(
    () =>
      createListCollection({
        items: data ?? [],
        itemToValue: (item) => item?.id,
        itemToString: (item) => item.name,
      }),
    [data],
  );

  // Initialize hook form
  const { fields, append, remove } = useFieldArray({
    control,
    name: `variations.${variationIndex}.teamVariations`,
  });
  const teamVariationErrors =
    errors.variations?.[variationIndex]?.teamVariations;

  return (
    <Fieldset.Root invalid={!!teamVariationErrors?.root?.message}>
      <Fieldset.Legend>Quantity</Fieldset.Legend>
      {fields.map((field, index) => (
        <Fieldset.Content
          p={4}
          borderWidth={"thin"}
          key={field.id}
          alignItems={"end"}
          borderRadius={"md"}
          flexDirection={"row"}
        >
          <Field.Root
            required
            invalid={!!teamVariationErrors?.[index]?.teamId || error}
          >
            <Field.Label>
              Store <Field.RequiredIndicator />
            </Field.Label>
            <Controller
              control={control}
              name={`variations.${variationIndex}.teamVariations.${index}.teamId`}
              render={({ field }) => (
                <Select.Root
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => {
                    field.onChange(value);
                    field.onBlur();
                  }}
                  onInteractOutside={() => field.onBlur()}
                  collection={storeCollection}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select store" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.ClearTrigger />
                      {isLoading ? <Spinner size="sm" /> : <Select.Indicator />}
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {storeCollection.items.map((store) => (
                          <Select.Item item={store} key={store.id}>
                            {store.name}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              )}
            />
            {error && (
              <Button
                w={"full"}
                size={"sm"}
                variant={"subtle"}
                onClick={() => mutate()}
              >
                Click to retry
              </Button>
            )}
            <Field.HelperText>Store with variation available</Field.HelperText>
            <Field.ErrorText>
              {error
                ? "Stores unavailable. Retry to continue."
                : teamVariationErrors?.[index]?.teamId?.message}
            </Field.ErrorText>
          </Field.Root>

          <Field.Root
            required
            invalid={!!teamVariationErrors?.[index]?.quantity}
          >
            <Field.Label>
              Quantity <Field.RequiredIndicator />
            </Field.Label>
            <Controller
              control={control}
              name={`variations.${variationIndex}.teamVariations.${index}.quantity`}
              render={({ field }) => (
                <NumberInput.Root
                  min={0}
                  step={1}
                  w={"full"}
                  name={field.name}
                  disabled={field.disabled}
                  defaultValue={"0"}
                  formatOptions={{ maximumFractionDigits: 0 }}
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
            <Field.HelperText>
              Quantity of variation at the store
            </Field.HelperText>
            <Field.ErrorText>
              {teamVariationErrors?.[index]?.quantity?.message}
            </Field.ErrorText>
          </Field.Root>

          <IconButton
            size="sm"
            type="button"
            variant="subtle"
            onClick={() => remove(index)}
          >
            <LuTrash2 />
          </IconButton>
        </Fieldset.Content>
      ))}

      <Button
        size="sm"
        type="button"
        variant="outline"
        alignSelf="flex-start"
        onClick={() => append(emptyTeamVariation)}
      >
        <LuPlus /> Add store
      </Button>

      <Fieldset.ErrorText>
        {teamVariationErrors?.root?.message}
      </Fieldset.ErrorText>
    </Fieldset.Root>
  );
};

export default TeamVariationField;
