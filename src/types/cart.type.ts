import { Product } from "@/types/product.type";
export type Cart = {
  productId: string;
  qty: number;
  size: string;
  product?: Product;
};
