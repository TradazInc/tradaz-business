"use client";

import { Product } from "@/server/entities/product";
import { Box, Carousel, IconButton } from "@chakra-ui/react";
import { CldImage } from "next-cloudinary";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface Props {
  product: Product;
}

const ProductCarousel = ({ product }: Props) => {
  return (
    <Carousel.Root slideCount={product.images.length} w={"full"} gap={"4"}>
      <Carousel.ItemGroup w={"full"}>
        {product.images.map((img, index) => (
          <Carousel.Item key={img.id} index={index}>
            <Box rounded="md" asChild>
              <CldImage
                src={img.url}
                aspectRatio={4 / 3}
                crop={"fill"}
                alt={`Product image ${index + 1}`}
              />
            </Box>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      <Carousel.Control justifyContent="center" gap="4">
        <Carousel.PrevTrigger asChild>
          <IconButton size="xs" variant="ghost">
            <LuChevronLeft />
          </IconButton>
        </Carousel.PrevTrigger>

        <Carousel.Indicators />

        <Carousel.NextTrigger asChild>
          <IconButton size="xs" variant="ghost">
            <LuChevronRight />
          </IconButton>
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  );
};

export default ProductCarousel;
