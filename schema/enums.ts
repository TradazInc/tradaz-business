export enum OrgRole {
  owner = "owner",
  admin = "admin",
  member = "member",
  // sales = "sales",
  // manager = "manager",
  // vendor = "vendor",
  // customer = "customer",
}

export enum TransactionStatus {
  pending = "pending",
  paid = "paid",
}

export enum OrderStatus {
  pending = "pending",
  paid = "paid",
  fulfilled = "fulfilled",
  cancelled = "cancelled",
}

export enum Gateway {
  opay = "opay",
  moniepoint = "moniepoint",
  paystack = "paystack",
}
