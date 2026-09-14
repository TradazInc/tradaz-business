import { authClient } from "@/lib/authClient";
import { z } from "zod";
import { FetchResponse } from "./fetchResponse";

// Get All
export type Member = typeof authClient.$Infer.Member & {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null | undefined;
  };
};
export type GetAllMembersOutputData = FetchResponse<Member>;

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
