import { PAGE_SIZE } from "@/data/constants";
import { authClient } from "@/lib/authClient";
import { z } from "zod";
import { FetchResponse } from "../utilities/fetchResponse";

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
  limit: z.number().nonnegative().default(PAGE_SIZE),
  offset: z.number().nonnegative().optional(),
  sortBy: z.string().optional(),
  sortDirection: z.enum(["asc", "desc"]).optional(),
  filterField: z.string(),
  filterOperator: z
    .enum([
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
    ])
    .optional(),
  filterValue: z
    .union([
      z.string(),
      z.number(),
      z.boolean(),
      z.string().array(),
      z.number().array(),
    ])
    .optional(),
});
export type GetAllMembersQueryData = z.infer<typeof GetAllMembersQuerySchema>;
