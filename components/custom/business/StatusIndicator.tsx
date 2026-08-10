import { statusMap } from "@/data/statusMap";
import { ProductStatus } from "@/server/entities/product";
import { Status } from "@chakra-ui/react";

interface Props {
  status: ProductStatus;
}

const StatusIndicator = ({ status }: Props) => {
  return (
    <Status.Root colorPalette={statusMap[status].color}>
      <Status.Indicator />
      {statusMap[status].label}
    </Status.Root>
  );
};

export default StatusIndicator;
