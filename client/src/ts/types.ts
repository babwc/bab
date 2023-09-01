export enum BtnType {
  Button = "button",
  Submit = "submit",
}

export enum Operator {
  Add = "Add",
  Subtract = "Subtract",
}

export enum Role {
  Admin = "admin",
  Customer = "customer",
}

export enum ProductTypeEnum {
  Item = "Item",
  Container = "Container",
}

export enum Order_Type {
  GLOBAL = "global",
  USER = "user",
}

export enum Order_Status {
  ALL = "All",
  ACCEPTED = "Accepted",
  PENDING = "Pending",
  CANCELLED = "Cancelled",
}

export enum Settings {
  Orders = "orders",
  Reservations = "reservations",
  Restricted = "restricted",
  Products = "products",
}

export enum ReqMethod {
  Get = "GET",
  Post = "POST",
  Patch = "PATCH",
  Put = "PUT",
  Delete = "DELETE",
}

export type RegularFunction = () => void;
