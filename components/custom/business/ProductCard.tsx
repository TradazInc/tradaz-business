import noImage from "@/public/no-image-placeholder.webp";
import { ProductStatus } from "@/server/entities/product";
import { Button, Card, DataList, HStack, Image } from "@chakra-ui/react";
import { CldImage } from "next-cloudinary";
import NextImage from "next/image";
import NextLink from "next/link";
import { MdDeleteOutline, MdOutlineViewInAr } from "react-icons/md";
import StatusIndicator from "./StatusIndicator";

interface Props {
  name: string;
  brand?: string;
  productStatus: ProductStatus;
  href: string;
  image?: string;
  vendor?: string;
  variationCount?: number;
}

const ProductCard = ({
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
        <DataList.Root size="sm">
          {vendor && (
            <DataList.Item>
              <DataList.ItemLabel>Vendor</DataList.ItemLabel>
              <DataList.ItemValue>{vendor}</DataList.ItemValue>
            </DataList.Item>
          )}
          {brand && (
            <DataList.Item>
              <DataList.ItemLabel>Brand</DataList.ItemLabel>
              <DataList.ItemValue>{brand}</DataList.ItemValue>
            </DataList.Item>
          )}
          {variationCount && (
            <DataList.Item>
              <DataList.ItemLabel>Variations</DataList.ItemLabel>
              <DataList.ItemValue>{variationCount}</DataList.ItemValue>
            </DataList.Item>
          )}
        </DataList.Root>
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
