import { Button, Field, Fieldset, Input, Stack } from "@chakra-ui/react";

export const StoreForm = () => {
  return (
    <Fieldset.Root size="lg" maxW="md">
      <Stack>
        <Fieldset.Legend>Contact details</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your contact details below.
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
            Address
            <Field.RequiredIndicator />
          </Field.Label>
          <Input name="address" />
        </Field.Root>
      </Fieldset.Content>

      <Button type="submit" alignSelf="flex-start">
        Submit
      </Button>
    </Fieldset.Root>
  );
};
