import instance from "@/lib/axios/instance";
import { Product } from "@/types/product.type";

const endpoint = "/api/product";

const productServices = {
  getAllProducts: () => instance.get(endpoint),
  getProductsByLimit: (limit: number) =>
    instance.get(endpoint, {
      params: {
        limit,
      },
    }),
  getProduct: (id: string) => instance.get(`${endpoint}/${id}`),
  addProduct: (data: Product) => instance.post(endpoint, { data }),
  deleteProduct: (id: string) => instance.delete(`${endpoint}/${id}`),
  updateProduct: (
    id: string,
    data: Product | { mainImage: string; images: string[] }
  ) => instance.put(`${endpoint}/${id}`, { data }),

  getProductByCategory: (category: string) =>
    instance.get(`${endpoint}/category/${encodeURIComponent(category)}`),
};

export default productServices;
