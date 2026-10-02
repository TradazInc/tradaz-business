import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { z } from "zod";

export const useSearchQuery = <T extends z.ZodType>(dataSchema: T) => {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const { data, success } = dataSchema.safeParse(
      Object.fromEntries(searchParams),
    );
    return success ? (data as z.infer<T>) : null;
  }, [searchParams, dataSchema]);
};
