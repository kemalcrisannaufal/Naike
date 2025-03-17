/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/lib/axios/instance";

const productServices = {
  getAllProducts: () => instance.get("/api/product"),
  addProduct: (token: string, data: any) =>
    instance.post(
      "/api/product",
      { data },
      { headers: { Authorization: `Bearer ${token}` } }
    ),
  deleteProduct: (token: string, id: string) =>
    instance.delete(`/api/product/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  updateProduct: (token: string, id: string, data: any) =>
    instance.put(
      `/api/product/${id}`,
      { data },
      { headers: { Authorization: `Bearer ${token}` } }
    ),
};

export default productServices;
