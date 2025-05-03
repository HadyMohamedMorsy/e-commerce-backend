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

export enum CouponType {
  FREE_SHIPPING_ALL = "free_shipping_all",
  FREE_SHIPPING_CATEGORY = "free_shipping_category",
  FREE_SHIPPING_PRODUCT = "free_shipping_product",
  BUY_ONE_GET_ONE_ALL = "buy_one_get_one_all",
  BUY_ONE_GET_ONE_CATEGORY = "buy_one_get_one_category",
  BUY_ONE_GET_ONE_PRODUCT = "buy_one_get_one_product",
  DISCOUNT_ALL = "discount_all",
  DISCOUNT_CATEGORY = "discount_category",
  DISCOUNT_PRODUCT = "discount_product",
}
