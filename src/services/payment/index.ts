import instance from "@/lib/axios/instance";
import { Payment } from "@/types/payment.type";

const paymentServices = {
  getPaymentInfo: (orderId: string) => instance.get(`/api/payment/${orderId}`),
  createPayment: (data: Payment) => instance.post("/api/payment", { data }),
};

export default paymentServices;
