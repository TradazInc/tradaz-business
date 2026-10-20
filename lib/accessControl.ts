import { createAccessControl } from "better-auth/plugins/access";
import {
  adminAc,
  defaultStatements as adminStatements,
  userAc,
} from "better-auth/plugins/admin/access";
import { defaultStatements as organizationStatements } from "better-auth/plugins/organization/access";

/* Platform-level Resources */
const platformStatement = {
  ...adminStatements,

  businessCategories: ["create", "read", "delete"],
  banks: ["read"],
  country: ["read"],
  media: ["upload"],
} as const;

export const platformAc = createAccessControl(platformStatement);

export const admin = platformAc.newRole({
  businessCategories: ["create", "read", "delete"],
  banks: ["read"],
  country: ["read"],
  media: ["upload"],
  ...adminAc.statements,
});

export const user = platformAc.newRole({
  businessCategories: ["read"],
  banks: ["read"],
  country: ["read"],
  media: ["upload"],
  ...userAc.statements,
});

/* Organization-scoped Resources */
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
