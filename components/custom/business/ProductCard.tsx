import { ProductStatus } from "@/server/entities/product";
import { Button, Card, Image } from "@chakra-ui/react";
import NextLink from "next/link";
import StatusIndicator from "./StatusIndicator";
import livingRoomSofa from "@/public/living-room-sofa.png";

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
      <Image src={image ?? livingRoomSofa.src} />
      <Card.Body gap="2">
        <Card.Title>{name}</Card.Title>
        <Card.Description>{description}</Card.Description>
        <StatusIndicator status={productStatus} />
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant={"solid"} asChild>
          <NextLink href={href}>View</NextLink>
        </Button>
        <Button variant={"ghost"} bg={"bg.error"} asChild>
          Delete
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;
