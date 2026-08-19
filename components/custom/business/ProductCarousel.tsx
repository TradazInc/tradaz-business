"use client";

import { Product } from "@/server/entities/product";
import { Box, Carousel } from "@chakra-ui/react";
import { CldImage } from "next-cloudinary";

interface Props {
  product: Product;
}

const ProductCarousel = ({ product }: Props) => {
  return (
    <Carousel.Root
      slideCount={product.images.length}
      w={"full"}
      mx={"auto"}
      gap={"4"}
    >
      <Carousel.ItemGroup w={"full"}>
        {product.images.map((img, index) => (
          <Carousel.Item key={img.id} index={index}>
            <Box rounded={"md"} asChild>
              <CldImage
                src={img.url}
                aspectRatio={1}
                crop={"fill"}
                alt={`Product image ${index + 1}`}
              />
            </Box>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      <Carousel.IndicatorGroup w={"full"}>
        {product.images.map((img, index) => (
          <Carousel.Indicator
            key={index}
            index={index}
            unstyled
            _current={{
              outline: "2px solid currentColor",
              outlineOffset: "2px",
            }}
          >
            <Box w={"20"} rounded={"md"}>
              <CldImage
                src={img.url}
                aspectRatio={1}
                crop={"fill"}
                alt={`Product image ${index + 1}`}
              />
            </Box>
          </Carousel.Indicator>
        ))}
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  );
};

export default ProductCarousel;
