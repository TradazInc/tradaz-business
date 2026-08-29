import { FetchResponse } from "@/lib/apiClient";
import { Coupon } from "@/entities/coupons";
import { Box } from "@chakra-ui/react";

interface Props {
  initialPointsConfigs: FetchResponse<Coupon>;
  businessId: string | undefined;
}

const CouponTable = ({ initialPointsConfigs, businessId }: Props) => {
  return <Box>CouponTable</Box>;
};

export default CouponTable;
