import { ProductStatus } from "@/server/entities/product";
import { Status } from "@chakra-ui/react";

interface Props {
  status: ProductStatus;
}

const statusMap: Record<
  ProductStatus,
  { label: string; color: "red" | "orange" | "green" }
> = {
  approved: { label: "Approved", color: "green" },
  pending: { label: "Pending", color: "orange" },
  rejected: { label: "Rejected", color: "red" },
};

const StatusIndicator = ({ status }: Props) => {
  return (
    <Status.Root colorPalette={statusMap[status].color}>
      <Status.Indicator />
      {statusMap[status].label}
    </Status.Root>
  );
};

export default StatusIndicator;
