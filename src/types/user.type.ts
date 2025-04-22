import { Address } from "./address.type";

export type User = {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  role: string;
  image: string;
  address?: Address[];
  updated_at: Date;
  created_at: Date;
  password?: string;
  type?: string;
};
