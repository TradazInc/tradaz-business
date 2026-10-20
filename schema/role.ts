import { orgAc } from "@/lib/accessControl";
import { z } from "zod";

// Resources a business can grant to a custom role.
// `ac` (managing roles themselves) is deliberately not grantable from the UI.
const { ac: _ac, ...grantable } = orgAc.statements;
export const roleStatements = grantable;

export type RoleStatements = typeof roleStatements;
export type RoleResource = keyof RoleStatements;
export type RoleAction<R extends RoleResource = RoleResource> =
  RoleStatements[R][number];
export type RolePermission = { [R in RoleResource]?: RoleAction<R>[] };

const resources = Object.keys(roleStatements) as [
  RoleResource,
  ...RoleResource[],
];

// Create
export const CreateRoleInputSchema = z.object({
  role: z
    .string({ error: "role name is required" })
    .trim()
    .min(2, { error: "role name must be at least 2 characters long" })
    .max(50, { error: "role name must be at most 50 characters long" })
    .regex(/^[a-z0-9-]+$/, {
      error: "use lowercase letters, numbers and hyphens only",
    }),

  permission: z
    .partialRecord(z.enum(resources), z.string().array())
    .superRefine((permission, ctx) => {
      let selected = 0;

      for (const [resource, actions] of Object.entries(permission)) {
        const allowed: readonly string[] =
          roleStatements[resource as RoleResource];
        for (const action of actions ?? []) {
          if (!allowed.includes(action)) {
            ctx.addIssue({
              code: "custom",
              path: [resource],
              message: `"${action}" is not a valid ${resource} permission`,
            });
          }
        }
        selected += actions?.length ?? 0;
      }

      if (selected === 0) {
        ctx.addIssue({
          code: "custom",
          message: "select at least one permission",
        });
      }
    }),
});
export type CreateRoleInputData = z.infer<typeof CreateRoleInputSchema>;

export const emptyRole: CreateRoleInputData = { role: "", permission: {} };

/** Drops resources with no selected actions so the API only sees granted ones. */
export const toPermission = (
  permission: CreateRoleInputData["permission"],
): Record<string, string[]> =>
  Object.fromEntries(
    Object.entries(permission).filter(
      (entry): entry is [string, string[]] => !!entry[1]?.length,
    ),
  );
