import noImage from "@/public/no-image-placeholder.webp";
import { ProductStatus } from "@/server/entities/product";
import { Button, Card, HStack, Image, List } from "@chakra-ui/react";
import { CldImage } from "next-cloudinary";
import NextImage from "next/image";
import NextLink from "next/link";
import { LuCircleCheck } from "react-icons/lu";
import { MdDeleteOutline, MdOutlineViewInAr } from "react-icons/md";
import StatusIndicator from "./StatusIndicator";

interface Props {
  name: string;
  brand?: string;
  description: string;
  productStatus: ProductStatus;
  href: string;
  image?: string;
  vendor?: string;
  variationCount: number;
}

const ProductCard = ({
  description,
  href,
  name,
  brand,
  productStatus,
  image,
  variationCount,
  vendor,
}: Props) => {
  return (
    <Card.Root maxW={"sm"} overflow={"hidden"} border={"none"} h={"full"}>
      <Image asChild w={"full"} aspectRatio={4 / 3} objectFit={"cover"}>
        {image ? (
          <CldImage
            src={image}
            aspectRatio={4 / 3}
            crop={"fill"}
            gravity={"auto"}
            alt={name}
          />
        ) : (
          <NextImage src={noImage} alt={`No image for ${name}`} />
        )}
      </Image>
      <Card.Body gap="2">
        <HStack justify={"space-between"}>
          <Card.Title>{name}</Card.Title>
          <StatusIndicator status={productStatus} />
        </HStack>
        <Card.Description>
          {description}
          <List.Root gap="2" variant="plain" align="center">
            {vendor && (
              <List.Item>
                <List.Indicator asChild color="green.500">
                  <LuCircleCheck />
                </List.Indicator>
                Vendor: {vendor}
              </List.Item>
            )}
            {brand && (
              <List.Item>
                <List.Indicator asChild color="green.500">
                  <LuCircleCheck />
                </List.Indicator>
                Brand: {brand}
              </List.Item>
            )}
            <List.Item>
              <List.Indicator asChild color="green.500">
                <LuCircleCheck />
              </List.Indicator>
              Variations: {variationCount}
            </List.Item>
          </List.Root>
        </Card.Description>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant={"subtle"} colorPalette={"blue"} flex={"1"} asChild>
          <NextLink href={href}>
            <MdOutlineViewInAr />
            View
          </NextLink>
        </Button>
        <Button
          variant={"subtle"}
          colorPalette={"red"}
          flex={"1"}
          onClick={() => {}}
        >
          <MdDeleteOutline />
          Delete
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;
