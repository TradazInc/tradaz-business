"use client";

import { CreateBusinessInputData } from "@/schema/business";
import { Field, Fieldset, Input, InputGroup } from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";

interface Props {
  form: UseFormReturn<CreateBusinessInputData>;
}

const ContactStep = ({
  form: {
    register,
    formState: { errors },
  },
}: Props) => {
  const withMask = useHookFormMask(register);

  return (
    <Fieldset.Root>
      <Field.Root required invalid={!!errors.slug}>
        <Field.Label>
          Slug <Field.RequiredIndicator />
        </Field.Label>
        <InputGroup startAddon="www." endAddon=".com">
          <Input placeholder="yoursite" {...register("slug")} />
        </InputGroup>
        <Field.HelperText>Subdomain of business website</Field.HelperText>
        <Field.ErrorText>
          <Field.ErrorIcon />
          {errors.slug?.message}
        </Field.ErrorText>
      </Field.Root>

      <Field.Root required invalid={!!errors.address}>
        <Field.Label>
          Address <Field.RequiredIndicator />
        </Field.Label>
        <Input
          placeholder="e.g., 123 Main St, Lekki, Lagos"
          {...register("address")}
        />
        <Field.HelperText>Address of business HQ</Field.HelperText>
        <Field.ErrorText>{errors.address?.message}</Field.ErrorText>
      </Field.Root>

      <Field.Root required invalid={!!errors.phone}>
        <Field.Label>
          Phone <Field.RequiredIndicator />
        </Field.Label>
        <Input
          placeholder="0812-345-6789"
          {...withMask("phone", "9999-999-9999", {
            autoUnmask: true,
          })}
        />
        <Field.HelperText>Contact number of business</Field.HelperText>
        <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
      </Field.Root>
    </Fieldset.Root>
  );
};

export default ContactStep;
