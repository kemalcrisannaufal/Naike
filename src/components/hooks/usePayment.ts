import paymentServices from "@/services/payment";
import { Payment } from "@/types/payment.type";
import { useEffect, useState } from "react";
import { useOrder } from "./useOrder";
import { sortDataByDate } from "@/utils/sort";

export const usePayment = () => {
  const [payments, setPayments] = useState<Payment[]>();
  const { orders } = useOrder();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPayment = async () => {
      setIsLoading(true);
      const { data } = await paymentServices.getAllPayments();

      if (data) {
        const sortedPayments = sortDataByDate(data.data, "created_at");
        setPayments(sortedPayments);
      }
      setIsLoading(false);
    };
    getPayment();
  }, [orders]);

  return { payments, setPayments, isLoading };
};
