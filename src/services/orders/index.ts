/* eslint-disable @typescript-eslint/no-explicit-any */
import instance from "@/lib/axios/instance";

const endpoint = "/api/order";

const orderServices = {
  getOrders: () => instance.get(`${endpoint}`),
  updateOrder: (id: string, data: any) =>
    instance.put(`${endpoint}/${id}`, { data }),
  createOrder: (data: any) => instance.post(`${endpoint}`, { data }),
};

export default orderServices;
