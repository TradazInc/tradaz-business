import { Fieldset, Stack } from "@chakra-ui/react";

const UiConfigForm = () => {
  const onSubmit = async () => {};

  return (
    <Fieldset.Root
      w={"full"}
      size={"lg"}
      mx={"auto"}
      px={{ base: 4, md: 0 }}
      maxW={{ base: "full", md: "2xl", xl: "4xl" }}
      onSubmit={onSubmit}
    >
      <Stack>
        <Fieldset.Legend>UI Configuration</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide UI configurations below.
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content>Form fields</Fieldset.Content>
    </Fieldset.Root>
  );
};

export default UiConfigForm;
