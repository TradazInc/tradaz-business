"use client";

import { Product } from "@/server/entities/product";
import { Carousel } from "@chakra-ui/react";
import { CldImage } from "next-cloudinary";

interface Props {
  product: Product;
}

const ProductCarousel = ({ product }: Props) => {
  return (
    <Carousel.Root slideCount={product.images.length} w={"full"} gap={"4"}>
      <Carousel.ItemGroup w={"full"}>
        {product.images.map((img, index) => (
          <Carousel.Item key={img.id} index={index}>
            <CldImage
              src={img.url}
              aspectRatio={4 / 3}
              crop={"fill"}
              alt={`Product image ${index + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      <Carousel.IndicatorGroup>
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
            <CldImage
              src={img.url}
              aspectRatio={1}
              crop={"fill"}
              alt={`Product image ${index + 1}`}
            />
          </Carousel.Indicator>
        ))}
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  );
};

export default ProductCarousel;
