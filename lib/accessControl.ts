import { createAccessControl } from "better-auth/plugins/access";
import {
  adminAc as platformAdminAc,
  defaultStatements as platformStatements,
  userAc,
} from "better-auth/plugins/admin/access";
import {
  memberAc,
  adminAc as orgAdminAc,
  defaultStatements as organizationStatements,
  ownerAc,
} from "better-auth/plugins/organization/access";

/* Platform-level Resources */
const platformStatement = {
  ...platformStatements,
  businessCategories: ["create", "read", "delete"],
  banks: ["read"],
  country: ["read"],
  media: ["upload"],
} as const;

export const platformAc = createAccessControl(platformStatement);

/* Platform-level Roles */
export const admin = platformAc.newRole({
  businessCategories: ["create", "read", "delete"],
  banks: ["read"],
  country: ["read"],
  media: ["upload"],
  ...platformAdminAc.statements,
});

export const user = platformAc.newRole({
  businessCategories: ["read"],
  banks: ["read"],
  country: ["read"],
  media: ["upload"],
  ...userAc.statements,
});

/* Organization-level Resources */
const organizationStatement = {
  ...organizationStatements,
  // Product related
  products: ["create", "read", "update", "update-status", "delete", "share"],
  productCategories: ["create", "delete"],
  productEdits: ["create", "read", "update", "approve", "reject", "delete"],
  sizeTypes: ["create", "read", "update", "delete"],
  cart: ["create", "read", "update", "delete"],

  // Checkout related
  checkout: ["web", "pos"],
  orders: ["read", "update-status"],
  coupons: ["create", "read", "update", "delete"],
  shippingConfigs: ["create", "read", "update", "delete"],
  transactions: ["create", "read"],

  // Business related
  pointsConfig: ["create", "read", "update"],
  posConfig: ["create", "read", "update", "delete"],
  subaccounts: ["create", "read", "update"],
  uiConfig: ["read", "upsert", "delete"],
  supportChats: ["create", "update", "auth"],

  // Finance related
  finance: ["read"],
  expense: ["create", "read", "update", "delete"],
  revenue: ["create", "read", "update", "delete"],
  vendors: ["read"],
} as const;
export const orgAc = createAccessControl(organizationStatement);

/* Organization-level Roles */
export const owner = orgAc.newRole({ ...ownerAc.statements });
export const manager = orgAc.newRole({ ...orgAdminAc.statements });
export const staff = orgAc.newRole({ ...memberAc.statements });
export const customer = orgAc.newRole({ ...memberAc.statements });

// Resources a business can grant to a custom role.
// `ac` (managing roles themselves) is deliberately not grantable from the UI.
const { ac: _ac, ...grantable } = orgAc.statements;
export const roleStatements = grantable;

export type RoleStatements = typeof roleStatements;
export type RoleResource = keyof RoleStatements;
export type RoleAction<R extends RoleResource = RoleResource> =
  RoleStatements[R][number];
export type RolePermission = { [R in RoleResource]?: RoleAction<R>[] };

export const resources = Object.keys(roleStatements) as [
  RoleResource,
  ...RoleResource[],
];
