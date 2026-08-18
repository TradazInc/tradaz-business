import noImage from "@/public/no-image-placeholder.webp";
import { Product } from "@/server/entities/product";
import { Button, Card, DataList, HStack, Image } from "@chakra-ui/react";
import { CldImage } from "next-cloudinary";
import NextImage from "next/image";
import NextLink from "next/link";
import { MdDeleteOutline, MdOutlineViewInAr } from "react-icons/md";
import StatusIndicator from "./StatusIndicator";

interface Props {
  product: Product;
  href: string;
}

const ProductCard = ({ href, product }: Props) => {
  return (
    <Card.Root maxW={"sm"} overflow={"hidden"} border={"none"} h={"full"}>
      <Image asChild w={"full"} aspectRatio={4 / 3} objectFit={"cover"}>
        {product.images[0]?.url ? (
          <CldImage
            src={product.images[0]?.url}
            aspectRatio={4 / 3}
            crop={"fill"}
            gravity={"auto"}
            alt={product.name}
          />
        ) : (
          <NextImage src={noImage} alt={`No image for ${product.name}`} />
        )}
      </Image>
      <Card.Body gap="2">
        <HStack justify={"space-between"}>
          <Card.Title>{product.name}</Card.Title>
          <StatusIndicator status={product.productStatus} />
        </HStack>
        <DataList.Root size="sm">
          {product.vendor && (
            <DataList.Item>
              <DataList.ItemLabel>Vendor</DataList.ItemLabel>
              <DataList.ItemValue>
                {product.vendor.user.name}
              </DataList.ItemValue>
            </DataList.Item>
          )}
          {product.brand && (
            <DataList.Item>
              <DataList.ItemLabel>Brand</DataList.ItemLabel>
              <DataList.ItemValue>{product.brand}</DataList.ItemValue>
            </DataList.Item>
          )}
          {product._count?.variations && (
            <DataList.Item>
              <DataList.ItemLabel>Variations</DataList.ItemLabel>
              <DataList.ItemValue>
                {product._count?.variations}
              </DataList.ItemValue>
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
