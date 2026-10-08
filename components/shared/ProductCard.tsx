import noImage from "@/public/no-image-placeholder.webp";
import { GetAllProductOutputItemData } from "@/schema/product";
import { Card, DataList, HStack, Image } from "@chakra-ui/react";
import { CldImage } from "next-cloudinary";
import NextImage from "next/image";
import NextLink from "next/link";
import CardDeleteButton from "./CardDeleteButton";
import CardViewButton from "./CardViewButton";
import StatusIndicator from "./StatusIndicator";

interface Props {
  product: GetAllProductOutputItemData;
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
      <Card.Body gap={2}>
        <HStack justify={"space-between"}>
          <Card.Title>{product.name}</Card.Title>
          <StatusIndicator status={product.productStatus} />
        </HStack>

        <DataList.Root size={"sm"} orientation={"horizontal"}>
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

      <Card.Footer justifyContent={"flex-end"}>
        <CardViewButton asChild>
          <NextLink href={href}>View</NextLink>
        </CardViewButton>
        <CardDeleteButton onClick={() => {}}>Delete</CardDeleteButton>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;
