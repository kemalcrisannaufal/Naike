import { Address } from "./address.type";
import { Cart } from "./cart.type";

export type Order = {
  id: string;
  items: Cart[];
  address: Address;
  status: string;
  subtotal: number;
  taxes: number;
  created_at: Date;
  updated_at: Date;
};
