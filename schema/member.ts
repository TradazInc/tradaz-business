import { authClient } from "@/lib/authClient";
import { z } from "zod";

export type Member = typeof authClient.$Infer.Member & {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null | undefined;
  };
};

// Get All
export const GetAllMembersQuerySchema = z.object({
  organizationId: z.cuid2().optional(),
  limit: z.number().nonnegative(),
  offset: z.number().nonnegative(),
  sortBy: z.string(),
  sortDirection: z.enum(["asc", "desc"]),
  filterField: z.string(),
  filterOperator: z.enum([
    "eq",
    "ne",
    "lt",
    "lte",
    "gt",
    "gte",
    "in",
    "not_in",
    "contains",
    "starts_with",
    "ends_with",
  ]),
  filterValue: z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.string().array(),
    z.number().array(),
  ]),
});
export type GetAllMembersQueryData = z.infer<typeof GetAllMembersQuerySchema>;
