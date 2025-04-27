export enum Status {
  ACTIVE = "active",
  PENDING = "pending",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
}

export enum AuthType {
  Bearer,
  None,
}

export enum PaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDED = "refunded",
}

export enum UserStatus {
  CUSTOMER = "customer",
  USER = "user",
}

export enum FaqList {
  Product = "Product",
  All = "All",
}

export enum Weight {
  Item = "item",
  Weight = "Weight",
}

export enum Role {
  CEO = "CEO",
  ANALYST = "ANALYST",
  AUDITOR = "AUDITOR",
  SUPER_ADMIN = "SUPER_ADMIN",
  SALES_DIRECTOR = "SALES_DIRECTOR",
  OPERATIONS_DIRECTOR = "OPERATIONS_DIRECTOR",
  ACCOUNTANT = "ACCOUNTANT",
  FINANCE_MANAGER = "FINANCE_MANAGER",
  SYSTEM_ADMIN = "SYSTEM_ADMIN",
  CONTENT_MANAGER = "CONTENT_MANAGER",
  MARKETING_MANAGER = "MARKETING_MANAGER",
  SEO_SPECIALIST = "SEO_SPECIALIST",
  STORE_MANAGER = "STORE_MANAGER",
  INVENTORY_MANAGER = "INVENTORY_MANAGER",
  ORDER_MANAGER = "ORDER_MANAGER",
  CUSTOMER_SERVICE = "CUSTOMER_SERVICE",
  VIP_CUSTOMER = "VIP_CUSTOMER",
  WHOLESALE_CUSTOMER = "WHOLESALE_CUSTOMER",
  CUSTOMER = "CUSTOMER",
  TECH_SUPPORT = "TECH_SUPPORT",
}
