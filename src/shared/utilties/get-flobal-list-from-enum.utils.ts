import { FaqList, PaymentStatus, Role, Status, UserStatus, Weight } from "../enum/global-enum";

export function getRoleList() {
  return generateListFromEnum(Role);
}

export function getUserStatusList() {
  return generateListFromEnum(UserStatus);
}

export function getPaymentStatusList() {
  return generateListFromEnum(PaymentStatus);
}

export function getStatusList() {
  return generateListFromEnum(Status);
}

export function getFaqList() {
  return generateListFromEnum(FaqList);
}

export function getWeight() {
  return generateListFromEnum(Weight);
}

export function generateListFromEnum<T extends Record<string, any>>(enumObj: T) {
  return Object.entries(enumObj).map(([key, value]) => ({
    label: key
      .split("_")
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" "),
    value,
  }));
}
