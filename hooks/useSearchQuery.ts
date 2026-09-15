import { useSearchParams } from "next/navigation";
import { z } from "zod";

export const useSearchQuery = <T extends z.ZodType>(dataSchema: T) => {
  const searchParams = useSearchParams();
  const { data, success } = dataSchema.safeParse(
    Object.fromEntries(searchParams),
  );

  return success ? data : null;
};
