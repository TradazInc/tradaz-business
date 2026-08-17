import noImage from "@/public/no-image-placeholder.webp";
import { ProductStatus } from "@/server/entities/product";
import { Button, Card, HStack, Image } from "@chakra-ui/react";
import { CldImage } from "next-cloudinary";
import NextImage from "next/image";
import NextLink from "next/link";
import { MdDeleteOutline, MdOutlineViewInAr } from "react-icons/md";
import StatusIndicator from "./StatusIndicator";

interface Props {
  name: string;
  description: string;
  productStatus: ProductStatus;
  href: string;
  image?: string;
}

const ProductCard = ({
  description,
  href,
  name,
  productStatus,
  image,
}: Props) => {
  return (
    <Card.Root maxW="sm" overflow="hidden">
      <Image asChild w={"full"} aspectRatio={1} objectFit={"cover"}>
        {image ? (
          <CldImage
            src={image}
            width={400}
            height={400}
            crop={"fill"}
            gravity={"auto"}
            alt={name}
          />
        ) : (
          <NextImage
            src={noImage}
            width={400}
            height={400}
            alt={`No image for ${name}`}
          />
        )}
      </Image>
      <Card.Body gap="2">
        <HStack>
          <Card.Title>{name}</Card.Title>
          <StatusIndicator status={productStatus} />
        </HStack>
        <Card.Description>{description}</Card.Description>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant={"subtle"} colorPalette={"bue"} flex={"1"} asChild>
          <MdOutlineViewInAr />
          <NextLink href={href}>View</NextLink>
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
