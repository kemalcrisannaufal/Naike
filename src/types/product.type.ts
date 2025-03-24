export type Product = {
  id?: string;
  name: string;
  price: number;
  category: string;
  mainImage: string;
  images: string[];
  description?: string;
  created_at?: Date;
  updated_at?: Date;
  stock: { size: string; qty: number }[];
  status: boolean;
  details?: string[];
  benefits?: string[];
  colourShown?: string;
  style?: string;
  country?: string;
};
