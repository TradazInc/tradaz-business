"use client";

import { Fieldset } from "@chakra-ui/react";

const ProductForm = () => {
  return (
    <form style={{ width: "100%" }}>
      <Fieldset.Root
        size="lg"
        w="full"
        maxW={{ base: "full", md: "2xl", xl: "4xl" }}
        mx="auto"
        px={{ base: 4, md: 0 }}
      >
        ProductForm
      </Fieldset.Root>
    </form>
  );
};

export default ProductForm;
