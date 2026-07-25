"use client";

import { ProductData, ProductFormValues } from "@/schema/product";
import {
  Button,
  Field,
  HStack,
  IconButton,
  Input,
  Stack,
} from "@chakra-ui/react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import { LuPlus, LuTrash2 } from "react-icons/lu";

interface Props {
  control: Control<ProductFormValues, unknown, ProductData>;
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  variationIndex: number;
}

const TeamVariationsField = ({
  control,
  register,
  errors,
  variationIndex,
}: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `variations.${variationIndex}.teamVariations`,
  });

  const teamVariationErrors =
    errors.variations?.[variationIndex]?.teamVariations;

  return (
    <Stack gap={3}>
      {fields.map((field, index) => (
        <HStack key={field.id} align="flex-start">
          <Field.Root required invalid={!!teamVariationErrors?.[index]?.teamId}>
            <Field.Label>Store</Field.Label>
            <Input
              placeholder="Team id"
              {...register(
                `variations.${variationIndex}.teamVariations.${index}.teamId`,
              )}
            />
            <Field.ErrorText>
              {teamVariationErrors?.[index]?.teamId?.message}
            </Field.ErrorText>
          </Field.Root>

          <Field.Root
            required
            invalid={!!teamVariationErrors?.[index]?.quantity}
          >
            <Field.Label>Quantity</Field.Label>
            <Input
              type="number"
              {...register(
                `variations.${variationIndex}.teamVariations.${index}.quantity`,
                { valueAsNumber: true },
              )}
            />
            <Field.ErrorText>
              {teamVariationErrors?.[index]?.quantity?.message}
            </Field.ErrorText>
          </Field.Root>

          <IconButton
            type="button"
            mt={8}
            variant="ghost"
            aria-label="Remove store"
            onClick={() => remove(index)}
          >
            <LuTrash2 />
          </IconButton>
        </HStack>
      ))}

      <Button
        type="button"
        size="sm"
        variant="outline"
        alignSelf="flex-start"
        onClick={() => append({ teamId: "", quantity: 1 })}
      >
        <LuPlus /> Add store quantity
      </Button>

      <Field.ErrorText>{teamVariationErrors?.root?.message}</Field.ErrorText>
    </Stack>
  );
};

export default TeamVariationsField;
